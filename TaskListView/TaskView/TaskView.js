import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';

export default class TaskView extends React.Component {
  render() {
    //console.log(this.props.navigation.state.params.text);
    const {params} = this.props.navigation.state;
    return (
      <View style={styles.container}>
        <Text>{params.text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'powderblue',
    alignSelf: 'stretch'
  }
});

//{this.props.navigation.state.params}
