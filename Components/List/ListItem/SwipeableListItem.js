import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';

export default class SwipeableListItem extends React.Component {
  render() {
    const {navigate} = this.props.navigation;
    const {id} = this.props.id;
    const {key} = this.props.item;
    //this.props.id;
    return (
      <View style={styles.list_box}>
        <TouchableHighlight onPress={() => navigate('TaskView', {text: key } ) }>
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
