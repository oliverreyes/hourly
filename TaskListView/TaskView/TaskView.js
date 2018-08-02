import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, TextInput, TouchableOpacity, DatePickerIOS } from 'react-native';

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
          <TouchableOpacity
            style={styles.input_button}
            onPress={this.props._toggleTextInput}>
            {
              this.props.show_input ? <TextInput
              style={styles.input_text}
              //onChangeText={this.props._changeNotif}
              value={this.props.notif ? "On" : "Off"}
              onSubmitEditing={this.props._toggleTextInput}
              /> : <Text style={styles.text}>Notifications - {this.props.notif ? "On" : "Off"}</Text>
            }
            </TouchableOpacity>
        </View>
        <View style={styles.row_container}>
          <TouchableOpacity
            style={styles.input_button}
            onPress={this.props._toggleTextInput}>
            { this.props.show_input ? <TextInput
              style={styles.input_text}
              //onChangeText={this.props._changeRepeat}
              value={"5"}
              onSubmitEditing={this.props._toggleTextInput}
              /> : <Text style={styles.text}>Priority - 5</Text>
            }
          </TouchableOpacity>
        </View>

        { !this.props.show_input && this.props.modified ? <TouchableOpacity
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
    { this.props.show_input ? <TextInput
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
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    backgroundColor: '#FFB000',
    //alignSelf: 'stretch'
  },
  row_container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    //borderBottomColor: '#BDBDBD',
    //borderBottomWidth: 0.3,
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
    //color: '#212121',
    color: '#FFFFFF'
  },
  input_header: {
    overflow: 'scroll',
    //backgroundColor: 'rgb(0,0,0,0.3)'
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
