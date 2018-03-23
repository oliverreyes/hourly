import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Navigator from './Navigation/Navigator';
import { Provider } from 'react-redux';
import store from './redux/store/store';


export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Navigator />
      </Provider>
    );
  }
}
