import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class SwipeableListItem extends React.Component {
  render() {
    return (
      <View style={styles.list_box}>
        <Text style={styles.list_text}>{this.props.item.key}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  list_box: {
    alignSelf: 'stretch',
    paddingVertical: 5
  },
  list_text: {
    fontSize: 60,
    textAlign: 'right',
    alignSelf: 'stretch',
    overflow: 'scroll'
  }
});
