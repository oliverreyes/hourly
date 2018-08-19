import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, FlatList, LayoutAnimation } from 'react-native';
import Separator from '../Separator';
import SwipeableListItemContainer from './SwipeableListItemContainer/SwipeableListItemContainer';
import InputListItemContainer from '../InputListItemContainer/InputListItemContainer';

/**
  * Container component handles list animations, scroll, and reorder functionality.
  * Displays list of tasks.
  * @prop {array} id_array array of ids for ordering
  * @prop {obj} navigation navigation props
  * @state {boolean} scroll_active flag to toggle scroll
  * @state {boolean} reorder_toggle flag to toggle reorder state
  * @state {integer} old_index holds value of previous index for reorder
  * @return FlatList, SwipeableListItemContainer components
  */
export default class SwipeableListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scroll_active: true,
      reorder_toggle: false,
      old_index: null,
      is_scrolling: false
    };
    this._toggleScroll = this._toggleScroll.bind(this);
    this._updateReorderIdx = this._updateReorderIdx.bind(this);
    this.toggleReorder = this._toggleReorder.bind(this);
  }

  /* Animate list movement when state changes */
  componentDidUpdate(){
    console.log("ANIMATING");
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
  }

  /* Turn key (item) into a string */
  _keyExtractor = (item) => item.toString();

  /* Allow or disable list scrolling */
  _toggleScroll(bool){
    this.setState({
      scroll_active: bool
    });
    console.log("SCROLL: " + this.state.scroll_active);
  }

  /* Store old index */
  _updateReorderIdx(index){
    this.setState({
      old_index: index
    })
  }
  /* Set reorder flag */
  _toggleReorder(){
    this.setState(prevState => ({
      reorder_toggle: !prevState.reorder_toggle
    }));
    console.log("REORDER: " + this.state.reorder_toggle);
  }
  render() {
    console.log(this.props.id_array);
    return (
      <FlatList
          style={styles.list_style}
          data={this.props.id_array}
          //ListHeaderComponent={<Text style={styles.header}>Tasks</Text>}
          ItemSeparatorComponent={() => <Separator />}
          scrollEnabled={this.state.scroll_active}
          onScrollBeginDrag={() => this.setState({
            is_scrolling: true
          })}
          onScrollEndDrag={() => this.setState({
            is_scrolling: false
          })}
          renderItem={({item}) =>
            <SwipeableListItemContainer
              item={item}
              navigation={this.props.navigation}
              _toggleScroll={bool => this._toggleScroll(bool)}
              reorder_toggle={this.state.reorder_toggle}
              old_index={this.state.old_index}
              _updateReorderIdx={(old_index) => this._updateReorderIdx(old_index)}
              _toggleReorder={() => this._toggleReorder()}
              is_scrolling={this.state.is_scrolling}
            />
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
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#000000'
  }
});
