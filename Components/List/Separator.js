import React, { Component } from 'react';
import { View } from 'react-native';

/**
  * Presentational component
  * @return View
  */
export default class Separator extends React.Component {
  render() {
    return (
      <View style={{ height: 0.5, alignSelf: 'stretch', backgroundColor: '#DCDCDC' }}></View>
    );
  }
}
