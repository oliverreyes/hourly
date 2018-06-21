import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import Separator from '../Separator';
import SwipeableListItemContainer from './SwipeableListItemContainer/SwipeableListItemContainer';
import InputListItemContainer from '../InputListItemContainer/InputListItemContainer';

export default class SwipeableListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scroll_active: true
    };
    this._toggleScroll = this._toggleScroll.bind(this);
  }
  // Need to turn key id into a String
  //_keyExtractor = (item) => item.id.toString();
  _keyExtractor = (item) => item.toString();

  _toggleScroll(){
    this.setState(prevState => ({
      scroll_active: !prevState.scroll_active
    }));
  }
  render() {
    console.log(this.props.data);
    return (
      <FlatList
          style={styles.list_style}
          data={this.props.data}
          ListHeaderComponent={<Text style={styles.header}>Tasks</Text>}
          ItemSeparatorComponent={() => <Separator />}
          scrollEnabled={this.state.scroll_active}
          renderItem={({item}) =>
            <SwipeableListItemContainer item={item} navigation={this.props.navigation} _toggleScroll={() => this._toggleScroll()}/>
          }
          keyExtractor={this._keyExtractor}
          ListFooterComponent={<InputListItemContainer />}

        />

    );
  }
}

const styles = StyleSheet.create({
  list_style: {
    alignSelf: 'stretch'
  },
  header: {
    fontSize: 50,
    fontWeight: 'bold'
  }
});
