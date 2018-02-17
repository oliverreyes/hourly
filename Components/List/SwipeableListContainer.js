import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import Separator from './Separator';
import SwipeableListItem from './ListItem/SwipeableListItem';

export default class SwipeableListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scroll_active: true,
      data: this.props.data
    };
    this.enableScroll = this.enableScroll.bind(this);
  }

  enableScroll(scroll_active) {
    this.setState({
      scroll_active
    });
  }
  render() {
    return (
      <FlatList
          data={this.state.data}
          ListHeaderComponent={<Text style={styles.header}>Tasks</Text>}
          ItemSeparatorComponent={() => <Separator />}
          renderItem={({item}) =>
            <SwipeableListItem item={item} navigation={this.props.navigation} />
          }

        />

    );
  }
}

const styles = StyleSheet.create({
  header: {
    fontSize: 50,
    fontWeight: 'bold',
  }
});
