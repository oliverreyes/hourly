import React, { Component } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, Text } from 'react-native';

export default class InputListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      show_text_input: false
    };
    this._showTextInput = this._showTextInput.bind(this);
    this._createTask = this._createTask.bind(this);
  }

  _showTextInput(){
    this.setState(prevState => ({
      show_text_input: !prevState.show_text_input
    }));
    console.log(this.state.show_text_input);
  }

  _createTask = async () => {
    try {
      console.log("POSTING");
      const response = await fetch(
        'http://192.168.1.108.xip.io:5000/create_task', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            title: this.state.input,
            deadline: null,
            notifications: false,
            repeat: false,
            notes: null
          }),
        });
      const responseJson = await response;
      if (responseJson.ok) {
        console.log("OK");
      }
      console.log(responseJson);
      this.setState({
        input: "",
        show_text_input: false
      });
    } catch (error) {
      console.error(error);
    }
  }



  render() {
    return (
      <View style={styles.input_container}>
        <TouchableOpacity
          style={styles.input_button}
          onPress={this._showTextInput}>
          <Text>Add Task</Text>
        </TouchableOpacity>
        { this.state.show_text_input ? <TextInput
          style={styles.input_text}
          placeholder="Add Task..."
          onChangeText={(input) => this.setState({input})}
          value ={this.state.input}
          onSubmitEditing={this._createTask}
          /> : null
        }
    </View>
    );
  }
}


const styles = StyleSheet.create({
  input_container: {
    alignSelf: 'stretch',
    paddingVertical: 10,
    height: 150
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
