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
      //reorder_id: null,
      reorder_toggle: false,
      old_index: null
    };
    this._toggleScroll = this._toggleScroll.bind(this);
    this._updateReorderIdx = this._updateReorderIdx.bind(this);
    this.toggleReorder = this._toggleReorder.bind(this);
  }

  componentDidUpdate(){
    console.log("ANIMATING");
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
  }

  /**
   * Turn key (item) into a string
   */
  _keyExtractor = (item) => item.toString();

  _toggleScroll(){
    this.setState(prevState => ({
      scroll_active: !prevState.scroll_active
    }));
    console.log("SCROLL: " + this.state.scroll_active);
  }
  
  _updateReorderIdx(index){
    this.setState({
      old_index: index
    })
  }

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
          ListHeaderComponent={<Text style={styles.header}>Tasks</Text>}
          ItemSeparatorComponent={() => <Separator />}
          scrollEnabled={this.state.scroll_active}
          renderItem={({item}) =>
            <SwipeableListItemContainer item={item} navigation={this.props.navigation} _toggleScroll={() => this._toggleScroll()} reorder_toggle={this.state.reorder_toggle} old_index={this.state.old_index} _updateReorderIdx={(old_index) => this._updateReorderIdx(old_index)} _toggleReorder={() => this._toggleReorder()} />
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
