import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';


class TaskListView extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Tasks</Text>
        <Button
          title="Go Home"
          onPress={() => this.props.navigation.navigate('Home')}
        />
        <Button
          title="Go to Goals"
          onPress={() => this.props.navigation.navigate('Goals')}
        />
      </View>
    );
  }
}

export default TaskListView;
