import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { StackNavigator } from 'react-navigation';
import TaskListView from './TaskListView/TaskListView';
import GoalListView from './GoalListView/GoalListView';
import HomeView from './HomeView/HomeView';

/**
  * StackNavigator component delegates between views
  */
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
    },
  },
  {
    initialRouteName: 'Tasks',
  }
);

export default Navigator;
