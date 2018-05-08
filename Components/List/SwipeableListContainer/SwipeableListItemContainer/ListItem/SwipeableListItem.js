import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Button } from 'react-native';
import {
  deleteTasks
} from '../../../../../redux/actions/actions';

export default class SwipeableListItem extends React.Component {
  render() {
    //console.log(this.props.item);
    const {navigate} = this.props.navigation;
    const {id, title} = this.props.item;
    //const {title, notifications, repeat} = this.props.item;
    //const deadline = (this.props.item.deadline ? this.props.item.deadline : "");
    //const notes = (this.props.item.notes ? this.props.item.notes : "");
    return (
      <View style={styles.list_box}>
        <TouchableHighlight onPress={this.props._getSelectedId}>
          <View>
            <Text style={styles.list_text}>{title}</Text>
            <Button
              onPress={this.props._deleteTask}
              title="Delete"
              color="#841584"
            />
            <Button
                onPress={() => navigate('TaskViewContainer', {
                  title: title,
                  deadline: deadline,
                  notifications: notifications,
                  repeat: repeat,
                  notes: notes,
                  id: id
                }
              )}
              title="Edit"
              color="#841584"
            />
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  list_box: {
    alignSelf: 'stretch',
    paddingVertical: 10,
    flex: 1
  },
  list_text: {
    fontSize: 28,
    textAlign: 'right',
    alignSelf: 'stretch',
    overflow: 'scroll'
  }
});
