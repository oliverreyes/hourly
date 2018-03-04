import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import Separator from './Separator';
import SwipeableListItem from './ListItem/SwipeableListItem';

export default class SwipeableListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scroll_active: true
    };
    this.enableScroll = this.enableScroll.bind(this);
  }
  // Need to turn key id into a String
  _keyExtractor = (item, index) => item.id.toString();

  enableScroll(scroll_active) {
    this.setState({
      scroll_active
    });
  }
  render() {
    console.log(this.props.data);
    return (
      <FlatList
          data={this.props.data}
          ListHeaderComponent={<Text style={styles.header}>Tasks</Text>}
          ItemSeparatorComponent={() => <Separator />}
          renderItem={({item}) =>
            <SwipeableListItem item={item} navigation={this.props.navigation} />
          }
          keyExtractor={this._keyExtractor}

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
