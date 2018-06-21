import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Button, Animated } from 'react-native';
import {
  deleteTasks
} from '../../../../../redux/actions/actions';

export default class SwipeableListItem extends React.Component {
  render() {
    const {navigate} = this.props.navigation;
    const {id, title, notes, notifications, repeat, deadline} = this.props.data;
    return (
      <Animated.View style={[this.props.pan.getLayout(), styles.list_box]} {...this.props.panHandlers}>
        <TouchableHighlight onLongPress={this.props._onLongPress}>
          <View >
            <Text style={styles.list_text}>{title}</Text>
            <Button
              onPress={this.props._deleteTask}
              title="Delete"
              color="#841584"
            />
            <Button
                onPress={() => navigate('TaskView', {
                  /*title: title,
                  deadline: deadline,
                  notifications: notifications,
                  repeat: repeat,
                  notes: notes,
                  id: id */
                  data: this.props.data
                }
              )}
              title="Edit"
              color="#841584"
            />
          </View>
        </TouchableHighlight>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  list_box: {
    alignSelf: 'stretch',
    paddingVertical: 10,
    flex: 1,
    backgroundColor: 'white',
    height: 150
  },
  list_text: {
    fontSize: 28,
    textAlign: 'right',
    alignSelf: 'stretch',
    overflow: 'scroll'
  }
});
