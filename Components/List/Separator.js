import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

/**
  * Presentational component
  * @return View
  */
export default class Separator extends React.Component {
  render() {
    return (
      <View style={styles.separator}></View>
    );
  }
}

const styles = StyleSheet.create({
  separator: {
    alignSelf: 'stretch',
    height: 0.5,
    backgroundColor: '#FFECB3',
    marginHorizontal: 10
  }
});
