import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Footer from '../Components/Footer';
import SwipeableListContainer from '../Components/List/SwipeableListContainer'


class TaskListView extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <SwipeableListContainer
          data={[
            {key: 'Wash Car'},
            {key: 'Get Haircut'},
            {key: 'Deposit $ at bank'},
            {key: 'Get some Headspace'},
            {key: 'Go to gym'},
            {key: 'Buy groceries'},
            {key: 'Pay off card'},
            {key: 'Watch boxing vids'},
          ]}
          navigation={this.props.navigation}
        />
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

export default TaskListView;

/*

*/
