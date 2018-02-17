import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';

export default class SwipeableListItem extends React.Component {
  render() {
    const {navigate} = this.props.navigation;
    const {key} = this.props.item;
    const {deadline} = this.props.item;
    const {notifications} = this.props.item;
    const {repeat} = this.props.item;
    const {notes} = this.props.item;
    console.log(this.props.item);
    return (
      <View style={styles.list_box}>
        <TouchableHighlight onPress={() => navigate('TaskView', {
            text: key,
            deadline: deadline,
            notifications: notifications,
            repeat: repeat,
            notes: notes,
          }
        )}>
          <Text style={styles.list_text}>{key}</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  list_box: {
    alignSelf: 'stretch',
    paddingVertical: 10
  },
  list_text: {
    fontSize: 50,
    textAlign: 'right',
    alignSelf: 'stretch',
    overflow: 'scroll'
  }
});
