import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, KeyboardAvoidingView } from 'react-native';
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
      <KeyboardAvoidingView style={styles.container} behavior='position' keyboardVerticalOffset={70} enabled>
        <SwipeableListContainer
          id_array={this.props.id_array}
          navigation={this.props.navigation}
        />
      </KeyboardAvoidingView>


    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //alignItems: 'center',
    //justifyContent: 'center',
    //backgroundColor: '#446482',
    backgroundColor: '#FFB000'
    //alignSelf: 'stretch'
  }
});

export default TaskListView;
