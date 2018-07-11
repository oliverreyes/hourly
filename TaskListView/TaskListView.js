import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import SwipeableListContainer from '../Components/List/SwipeableListContainer/SwipeableListContainer';
import {
  fetchTasks,
  REQUEST_TASKS,
  RECEIVE_TASKS
} from '../redux/actions/actions';

/**
  * Presentational component sets background style, displays list
  * @prop {array} id_array array of ids for ordering
  * @return SwipeableListContainer component
  */
class TaskListView extends Component {
  //May want to change how this works... separation of concerns
  /*
  componentDidMount(){
    console.log(this.props);
    this.props.fetchTasks();
  }
  */
  render() {
    console.log(this.props.id_array);
    return (
      <View style={styles.container}>
        <SwipeableListContainer
          id_array={this.props.id_array}
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
