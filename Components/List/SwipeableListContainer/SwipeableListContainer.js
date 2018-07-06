import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, FlatList, LayoutAnimation } from 'react-native';
import Separator from '../Separator';
import SwipeableListItemContainer from './SwipeableListItemContainer/SwipeableListItemContainer';
import InputListItemContainer from '../InputListItemContainer/InputListItemContainer';

export default class SwipeableListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scroll_active: true,
      reorder_id: null,
      reorder_toggle: false
    };
    this._toggleScroll = this._toggleScroll.bind(this);
    this._updateReorderId = this._updateReorderId.bind(this);
  }

  _updateReorderId(id){
    this.setState(prevState => ({
      reorder_id: id,
      reorder_toggle: !prevState.reorder_toggle
    }));
  }

  componentDidUpdate(){
    console.log("ANIMATING");
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
  }

  // Need to turn key id into a String
  _keyExtractor = (item) => item.toString();

  _toggleScroll(){
    console.log("SCROLL ENABLED");
    this.setState(prevState => ({
      scroll_active: !prevState.scroll_active
    }));
  }
  render() {
    console.log(this.props.id_array);
    return (
      <FlatList
          style={styles.list_style}
          data={this.props.id_array}
          ListHeaderComponent={<Text style={styles.header}>Tasks</Text>}
          ItemSeparatorComponent={() => <Separator />}
          scrollEnabled={this.state.scroll_active}
          renderItem={({item}) =>
            <SwipeableListItemContainer item={item} navigation={this.props.navigation} _toggleScroll={() => this._toggleScroll()} reorder_id={this.state.reorder_id} reorder_toggle={this.state.reorder_toggle} _updateReorderId={(reorder_id) => this._updateReorderId(reorder_id)} />
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
