import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import SwipeableListContainer from '../Components/List/SwipeableListContainer';
import {
  fetchTasks,
  REQUEST_TASKS,
  RECEIVE_TASKS
} from '../redux/actions/actions';


class TaskListView extends Component {
  //May want to change how this works... separation of concerns
  /*
  componentDidMount(){
    console.log(this.props);
    this.props.fetchTasks();
  }
  */
  render() {
    console.log(this.props.tasks.tasks);
    return (
      <View style={styles.container}>
        <SwipeableListContainer
          data={this.props.tasks.tasks.task_list}
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
*/
