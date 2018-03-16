import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import SwipeableListContainer from '../Components/List/SwipeableListContainer';


class TaskListView extends React.Component {
  constructor(props){
    super(props);
    this.state = {tasks: []};
  }

  async componentDidMount(){
    try {
      const response = await fetch(
        'http://192.168.1.108.xip.io:5000/get_tasks'
      );
      const responseJson = await response.json();
      console.log(responseJson);
      this.setState({
        tasks: responseJson
      });
    } catch (error) {
      console.error(error);
    }
  }


  render() {
    console.log(this.state.tasks);
    return (
      <View style={styles.container}>
        <SwipeableListContainer
          data={this.state.tasks}
          navigation={this.props.navigation}
        />
      </View>


    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'powderblue',
    alignSelf: 'stretch'
  }
});

export default TaskListView;

/*
[
  {key: 'Wash Car', deadline: 'Tomorrow', notifications: true, repeat: 'monthly', notes: 'Bring cash'},
  {key: 'Get Haircut', deadline: '8PM', notifications: true, repeat: 'biweekly', notes: 'Bring cash'},
  {key: 'Deposit $ at bank', deadline: 'Friday, 9AM', notifications: true, repeat: 'none', notes: 'Chase'},
  {key: 'Get some Headspace', deadline: '9PM', notifications: true, repeat: 'daily', notes: ''},
  {key: 'Go to gym', deadline: 'Tomorrow, 8AM', notifications: false, repeat: 'daily', notes: 'Bring ID'},
  {key: 'Buy groceries', deadline: 'Tomorrow, 1PM', notifications: false, repeat: '', notes: 'loofah'},
  {key: 'Pay off card', deadline: 'Monday, 9PM', notifications: true, repeat: 'weekly', notes: ''},
  {key: 'Watch boxing vids', deadline: 'Wed, 5PM', notifications: true, repeat: 'weekly', notes: 'Practice'},
]
*/

/*
  componentDidMount(){
    fetch('http://localhost:5000/get_tasks', {
      method: 'GET'
    }).then((response) => response.json())
    .then((responseJson) => this.setState({tasks: responseJson}))
    .catch((error) => {
      console.error(error);
    });
  }
*/

  /*
  componentDidMount(){
    var _this = this;
    console.log("Here");
    fetch('http:localhost:5000/get_tasks', {
      method: 'GET'
    }).then(function(response){
      if (response.status !== 200) {
            console.log('Page Error - Status Code: ' + response.status);
            return;
          }
          // Set new state with data from backend
          response.json().then(function(data) {
            console.warn(data);
            _this.setState({tasks: data});
          });
        })
      .catch(function(error) {
        console.log('Fetch Error :-S', error);
    });
  }
  */
