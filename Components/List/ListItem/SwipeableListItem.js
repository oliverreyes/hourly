import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';

export default class SwipeableListItem extends React.Component {
  render() {
    console.log(this.props.item);
    const {navigate} = this.props.navigation;
    const {title, notifications, repeat} = this.props.item;
    const deadline = (this.props.item.deadline ? this.props.item.deadline : "");
    const notes = (this.props.item.notes ? this.props.item.notes : "");
    return (
      <View style={styles.list_box}>
        <TouchableHighlight onPress={() => navigate('TaskView', {
            text: title,
            deadline: deadline,
            notifications: notifications,
            repeat: repeat,
            notes: notes,
          }
        )}>
          <Text style={styles.list_text}>{title}</Text>
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
