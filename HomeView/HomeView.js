import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Footer from '../Footer';


class HomeView extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home</Text>
        <Button
          title="Go to Tasks"
          onPress={() => this.props.navigation.navigate('Tasks')}
        />
        <Button
          title="Go to Goals"
          onPress={() => this.props.navigation.navigate('Goals')}
        />
      </View>
    );
  }
}

export default HomeView;
