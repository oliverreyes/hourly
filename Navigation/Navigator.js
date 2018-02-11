import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { StackNavigator } from 'react-navigation';
import TaskListView from '../TaskListView/TaskListView';
import GoalListView from '../GoalListView/GoalListView';
import HomeView from '../HomeView/HomeView';

const Navigator = StackNavigator(
  {
    Home: {
      screen: HomeView,
    },
    Goals: {
      screen: GoalListView,
    },
    Tasks: {
      screen: TaskListView,
    }
  },
  {
    initialRouteName: 'Tasks'
  }
);

export default Navigator;

/*
navigationOptions: {
  headerStyle: {
    position: 'absolute',
    backgroundColor: 'transparent',
    top: 0,
    left: 0,
    right: 0
  }
}
*/
