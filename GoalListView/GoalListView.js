import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Footer from '../Components/Footer';


class GoalListView extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Goals</Text>
        <Button
          title="Go Home"
          onPress={() => this.props.navigation.navigate('Home')}
        />
        <Button
          title="Go to Tasks"
          onPress={() => this.props.navigation.navigate('Tasks')}
        />
      </View>
    );
  }
}

export default GoalListView;
