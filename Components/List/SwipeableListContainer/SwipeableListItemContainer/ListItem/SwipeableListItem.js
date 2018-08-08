import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Button, Animated } from 'react-native';
import {
  deleteTasks
} from '../../../../../redux/actions/actions';

/**
  * Presentational component
  * @prop {obj} navigation navigation props
  * @return
  */
export default class SwipeableListItem extends React.Component {
  render() {
    const {navigate} = this.props.navigation;
    const {title} = (this.props.data != null) ? this.props.data : '';
    console.log(this.props.data);
    return (
      <Animated.View style={[this.props.pan.getLayout()]} {...this.props.panHandlers}>
        <TouchableHighlight
          style={this.props.reorder_toggle && (this.props.old_idx === this.props.idx) ? styles.list_item_reorder : styles.list_item}
          onPress={this.props.reorder_toggle ?
            this.props._onReorderPress : this.props._onPress}
          onLongPress={this.props._onLongPress}
          //delayLongPress={500}
          activeOpacity={0.9}
          underlayColor='#FFECB3' >
          <View >
            <Text numberOfLines={1} style={styles.list_text}>{title}</Text>
          </View>
        </TouchableHighlight>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  list_item: {
    alignSelf: 'stretch',
    paddingVertical: 10,
    flex: 1,
    //backgroundColor: 'white',
    //height: 250
    //shadowOffset: { width: 0, height: -2 },
    //shadowColor: 'black',
    //shadowOpacity: 1,
    backgroundColor: '#FFB000',
    //borderBottomColor: '#FFECB3',
    //borderBottomWidth: 0.5,
  },
  list_item_reorder: {
    alignSelf: 'stretch',
    paddingVertical: 10,
    flex: 1,
    backgroundColor: '#FFECB3',
  },
  list_text: {
    fontSize: 18,
    textAlign: 'right',
    alignSelf: 'stretch',
    //overflow: 'scroll',
    color: '#FFFFFF',
    margin: 10
  }
});

/*
<Button
  onPress={this.props._completeTask}
  title="Complete"
  color="#841584"
/>
<Button
  onPress={this.props._incompleteTask}
  title="Incomplete"
  color="#841584"
/>
<Button
    onPress={() => navigate('TaskView', {
      data: this.props.data
    }
  )}
  title="Edit"
  color="#841584"
/>
*/
