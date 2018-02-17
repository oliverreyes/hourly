import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Footer from '../Components/Footer';
import SwipeableListContainer from '../Components/List/SwipeableListContainer'


class TaskListView extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <SwipeableListContainer
          data={[
            {key: 'Wash Car', deadline: 'Tomorrow', notifications: true, repeat: 'monthly', notes: 'Bring cash'},
            {key: 'Get Haircut', deadline: '8PM', notifications: true, repeat: 'biweekly', notes: 'Bring cash'},
            {key: 'Deposit $ at bank', deadline: 'Friday, 9AM', notifications: true, repeat: 'none', notes: 'Chase'},
            {key: 'Get some Headspace', deadline: '9PM', notifications: true, repeat: 'daily', notes: ''},
            {key: 'Go to gym', deadline: 'Tomorrow, 8AM', notifications: false, repeat: 'daily', notes: 'Bring ID'},
            {key: 'Buy groceries', deadline: 'Tomorrow, 1PM', notifications: false, repeat: '', notes: 'loofah'},
            {key: 'Pay off card', deadline: 'Monday, 9PM', notifications: true, repeat: 'weekly', notes: ''},
            {key: 'Watch boxing vids', deadline: 'Wed, 5PM', notifications: true, repeat: 'weekly', notes: 'Practice'},
          ]}
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

*/
