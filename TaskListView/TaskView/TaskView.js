import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, TextInput, TouchableOpacity } from 'react-native';

/**
  * Presentational component
  * @prop {}
  * @return
  */
export default class TaskView extends React.Component {
  render() {
    //console.log(this.props.navigation.state.params.text);
    //const {params} = this.props.navigation.state;
    return (
      <View style={styles.container}>
        <View style={styles.input_container}>
          <TouchableOpacity
            style={styles.input_button}
            onPress={this.props._toggleTextInput}>
            { this.props.show_text_input ? <TextInput
              style={styles.input_header}
              onChangeText={this.props._changeTitle}
              value={this.props.title}
              onSubmitEditing={this.props._toggleTextInput}
              /> : <Text style={styles.header}>{this.props.title}</Text>
            }
          </TouchableOpacity>
        </View>
        <View style={styles.input_container}>
          <TouchableOpacity
            style={styles.input_button}
            onPress={this.props._toggleTextInput}>
            { this.props.show_text_input ? <TextInput
              style={styles.input_text}
              onChangeText={this.props._changeDl}
              value={this.props.dl}
              onSubmitEditing={this.props._toggleTextInput}
              /> : <Text style={styles.text}>Deadline - {this.props.dl}</Text>
            }
          </TouchableOpacity>
        </View>
        <View style={styles.input_container}>
          <TouchableOpacity
            style={styles.input_button}
            onPress={this.props._toggleTextInput}>
            { this.props.show_text_input ? <TextInput
              style={styles.input_text}
              //onChangeText={this.props._changeNotif}
              value={this.props.notif ? "On" : "Off"}
              onSubmitEditing={this.props._toggleTextInput}
              /> : <Text style={styles.text}>Notifications - {this.props.notif ? "On" : "Off"}</Text>
            }
            </TouchableOpacity>
        </View>
        <View style={styles.input_container}>
          <TouchableOpacity
            style={styles.input_button}
            onPress={this.props._toggleTextInput}>
            { this.props.show_text_input ? <TextInput
              style={styles.input_text}
              //onChangeText={this.props._changeRepeat}
              value={"5"}
              onSubmitEditing={this.props._toggleTextInput}
              /> : <Text style={styles.text}>Priority - 5</Text>
            }
          </TouchableOpacity>
        </View>
        { !this.props.show_text_input && this.props.modified ? <TouchableOpacity
          style={styles.input_button}
          onPress={this.props._editTask}>
          <Text>Save</Text>
          </TouchableOpacity>
          : null
        }
      </View>
    );
  }
}

/*
<View style={styles.input_container}>
  <TouchableOpacity
    style={styles.input_button}
    onPress={this.props._toggleTextInput}>
    { this.props.show_text_input ? <TextInput
      style={styles.input_text}
      onChangeText={this.props._changeStatus}
      value={this.props.status}
      onSubmitEditing={this.props._toggleTextInput}
      /> : <Text style={styles.text}>Status- {this.props.completed}</Text>
    }
  </TouchableOpacity>
</View>
*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: 'powderblue',
    alignSelf: 'stretch'
  },
  header: {
    fontSize: 50,
    fontWeight: 'bold',
  },
  task_options: {
    alignSelf: 'stretch',
    borderBottomWidth: 2,
    borderColor: 'grey',
    marginVertical: 20
  },
  text: {
    fontSize: 30,
    marginBottom: 5
  },
  input_container: {
    alignSelf: 'stretch',
    paddingVertical: 10,
    height: 100
  },
  input_header: {
    fontSize: 50,
    fontWeight: 'bold',
    marginVertical: 10,
    overflow: 'scroll'
  },
  input_text: {
    fontSize: 30,
    marginBottom: 5,
    overflow: 'scroll'
  }
});
