import React, { Component } from 'react';
import { View } from 'react-native';

export default class Separator extends React.Component {
  render() {
    return (
      <View style={{ height: 1, alignSelf: 'stretch', backgroundColor: 'grey' }}></View>
    );
  }
}
