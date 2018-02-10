import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { withNavigation } from 'react-navigation';

class Footer extends React.Component {
  render() {
    return (
      <View
        style={styles.footer_container}>
        <Button
          title="Home"
          onPress={() => this.props.navigation.navigate('Home')}
          color="white"
        />
        <Button
          title="Goals"
          onPress={() => this.props.navigation.navigate('Goals')}
          color="white"
        />
        <Button
          title="Tasks"
          onPress={() => this.props.navigation.navigate('Tasks')}
          color="white"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  footer_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'steelblue',
    alignSelf: 'stretch'
  }
});

export default withNavigation(Footer);
