import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';

export default class TaskView extends React.Component {
  render() {
    //console.log(this.props.navigation.state.params.text);
    const {params} = this.props.navigation.state;
    return (
      <View style={styles.container}>
        <Text style={styles.header}>{params.text}</Text>
        <View style={styles.task_options}>
          <Text style={styles.text}>Deadline: {params.deadline}</Text>
        </View>
        <View style={styles.task_options}>
          <Text style={styles.text}>Notifications: {params.notifications}</Text>
        </View>
        <View style={styles.task_options}>
          <Text style={styles.text}>Repeat: {params.repeat}</Text>
        </View>
        <View style={styles.task_options}>
          <Text style={styles.text}>Notes: {params.notes}</Text>
        </View>
      </View>
    );
  }
}

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
  }
});

//{this.props.navigation.state.params}
