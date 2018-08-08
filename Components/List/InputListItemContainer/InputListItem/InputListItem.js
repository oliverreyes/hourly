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
      <View style={styles.input_container} >
        { this.props.show_text_input ? <TextInput
          style={styles.input_text}
          placeholder="Type here..."
          placeholderTextColor='#FFECB3'
          onChangeText={this.props._changeInput}
          value ={this.props.input}
          onSubmitEditing={this.props._createTask}
          /> : <TouchableOpacity
            style={styles.input_button}
            onPress={this.props._showTextInput}>
            <Text style={styles.list_text}>What needs to get done?</Text>
          </TouchableOpacity>
        }
        {
          this.props.show_text_input ? <TouchableOpacity
          style={styles.input_button}
          onPress={this.props._showTextInput}>
          <Text style={styles.list_text}>Nevermind</Text>
          </TouchableOpacity> : null
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
    borderTopWidth: 0.5,
    borderTopColor: '#FFECB3',
    marginHorizontal: 10,
    //backgroundColor: '#446482',
    flex: 1
  },
  input_button: {

  },
  list_text: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFFFFF',
    margin: 10
  },
  input_text: {
    fontSize: 18,
    color: '#FFFFFF',
    marginVertical: 10,
    overflow: 'scroll',
    textAlign: 'right',
    marginRight: 10
    //borderBottomWidth: 1
  }
});
