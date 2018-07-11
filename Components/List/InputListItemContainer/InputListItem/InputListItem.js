import React, { Component } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, Text } from 'react-native';
import {
  fetchTasks,
  REQUEST_TASKS,
  RECEIVE_TASKS
} from '../../../../redux/actions/actions';

/**
  * Presentational component
  * @prop {}
  * @return
  */
export default class InputListItem extends Component {
  render() {
    console.log(this.props);
    return (
      <View style={styles.input_container}>
        <TouchableOpacity
          style={styles.input_button}
          onPress={this.props._showTextInput}>
          <Text>Add Task</Text>
        </TouchableOpacity>
        { this.props.show_text_input ? <TextInput
          style={styles.input_text}
          placeholder="Add Task..."
          onChangeText={this.props._changeInput}
          value ={this.props.input}
          onSubmitEditing={this.props._createTask}
          /> : null
        }
    </View>
    );
  }
}
//onChangeText={(input) => this.setState({input})}


const styles = StyleSheet.create({
  input_container: {
    alignSelf: 'stretch',
    paddingVertical: 10,
    height: 250
  },
  input_button: {

  },
  input_text: {
    fontSize: 28,
    marginVertical: 10,
    overflow: 'scroll',
    textAlign: 'right',
    borderTopWidth: 1,
    borderBottomWidth: 1
  }
});
