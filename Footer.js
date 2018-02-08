import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

class Footer extends React.Component {
  render() {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          backgroundColor: 'steelblue',
          alignSelf: 'stretch'
        }}>
        <Button
          title="Home"
          onPress={() => this.props.navigation.navigate('Home')}
        />
        <Button
          title="Goals"
          onPress={() => this.props.navigation.navigate('Goals')}
        />
        <Button
          title="Tasks"
          onPress={() => this.props.navigation.navigate('Tasks')}
        />
      </View>
    );
  }
}

export default Footer;
