import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, TextInput, TouchableOpacity, DatePickerIOS, Switch, Image } from 'react-native';

/**
  * Presentational component for task & task options.
  * @prop {func} _editTask call to save task modifications to DB
  * @prop {func} _deleteTask call to remove task
  * @prop {func} _toggleTextInput call to toggle text input
  * @prop {func} _togglePicker call to toggle datepicker
  * @prop {func} _changeTitle call to save modified title
  * @prop {func} __setDeadline call to save modified deadline setting
  * @prop {func} _setNotif call to save modifed notification setting
  * @prop {func} _setExp call to save modified priority setting
  * @prop {bool} show_input flag to show/hide text input
  * @prop {bool} show_picker flag to show/hide datepicker
  * @prop {bool} modified flag to show if task has pending changes
  * @prop {string} title task title
  * @prop {string} dl task deadline
  * @prop {string} new_dl task updated deadline
  * @prop {string} notif task notification setting
  * @prop {string} dl task deadline text
  * @prop {string} priority task priority setting
  * @prop {obj} today today's date
  * @return View components for each task setting
  */
export default class TaskView extends React.Component {
  render() {
    //console.log(this.props.navigation.state.params.text);
    //const {params} = this.props.navigation.state;
    return (
      <View style={styles.container}>
        <View style={styles.title_container}>
          <TouchableOpacity
            style={styles.input_button}
            onPress={this.props._toggleTextInput}>
            { this.props.show_input ? <TextInput
              style={[styles.header,styles.input_header]}
              onChangeText={this.props._changeTitle}
              value={this.props.title}
              onSubmitEditing={this.props._toggleTextInput}
              /> : <Text style={styles.header}>{this.props.title}</Text>
            }
          </TouchableOpacity>
        </View>
        <View style={styles.row_container}>
          <Text style={styles.text}>Deadline</Text>
          <TouchableOpacity
            onPress={this.props._togglePicker}>
            {
              this.props.show_picker ? <Text style={styles.text}>Cancel</Text> :
              <Text style={styles.text}>{this.props.dl}</Text>
            }
          </TouchableOpacity>
        </View>
        {
          this.props.show_picker ? <DatePickerIOS
          onDateChange={this.props._setDeadline}
          date={this.props.new_dl}
          mode='date'
          minimumDate={this.props.today} /> : null
        }
        <View style={styles.row_container}>
          <Text style={styles.text}>Notifications</Text>
          <Switch
            style={{marginRight: 10}}
            value={this.props.notif}
            onValueChange={this.props._setNotif}
            onTintColor='#FD4F57'
            tintColor='#FFFFFF'
          ></Switch>
        </View>
        <View style={styles.row_container}>
          <Text style={styles.text}>Priority</Text>
          <TouchableOpacity onPress={this.props._setExp}>
            <Text style={styles.text}>{this.props.priority}</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.row_container, {justifyContent: 'center'}]}>
        { !this.props.show_input && this.props.modified ? <TouchableOpacity
          onPress={this.props._editTask}>
          <Text style={[styles.text, {fontWeight: 'bold'}]}>Save Changes</Text>
          </TouchableOpacity>
          : <TouchableOpacity
            onPress={this.props._deleteTask}>
            <Image
              source={require('../../images/red-delete.png')}
              style={{height: 35, width: 35}}
            />
            </TouchableOpacity>
        }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    backgroundColor: '#FFB000'
  },
  row_container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowOffset: { width: 0, height: -0.1 },
    shadowColor: 'black',
    shadowOpacity: 0.25,
    backgroundColor: '#FFB000',

  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: 10,
    marginRight: 10,
    color: '#FFFFFF'
  },
  input_header: {
    overflow: 'scroll'
  },
  text: {
    fontSize: 18,
    marginLeft: 10,
    marginRight: 10,
    color: '#FFFFFF'
  },
  title_container: {
    flex: 3,
    paddingVertical: 10,
  },
  input_container: {
    alignSelf: 'stretch',
    paddingVertical: 10,
    height: 100
  },
  input_text: {
    overflow: 'scroll'
  }
});
