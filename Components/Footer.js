import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { withNavigation } from 'react-navigation';

/**
  * Presentational component
  * @prop {obj} navigation navigation props
  * @return View, Button components
  */
class Footer extends React.Component {
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View
        style={styles.footer_container}>
        <Button
          title="Home"
          onPress={() => navigate('Home')}
          color="white"
        />
        <Button
          title="Goals"
          onPress={() => navigate('Goals')}
          color="white"
        />
        <Button
          title="Tasks"
          onPress={() => navigate('Tasks')}
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
