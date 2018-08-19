import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback, Button, Animated, Dimensions, Image } from 'react-native';
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
      <Animated.View style={[this.props.pan.getLayout(), {flexDirection: 'row'}]} {...this.props.panHandlers}>
        <View style={styles.swipe_item}>
          <TouchableWithoutFeedback onPress={this.props._incompleteTask}>
            <Image
              source={require('../../../../../images/red-incomplete.png')}
              style={styles.swipe_icon}
            />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={this.props._completeTask}>
            <Image
              source={require('../../../../../images/green-complete.png')}
              style={styles.swipe_icon}
            />
          </TouchableWithoutFeedback>
        </View>
        <TouchableHighlight
          style={this.props.reorder_toggle && (this.props.old_idx === this.props.idx) ? styles.list_item_reorder : styles.list_item}
          onPress={this.props.reorder_toggle ?
            this.props._onReorderPress : this.props._onPress}
          onLongPress={this.props._onLongPress}
          delayLongPress={500}
          activeOpacity={0.9}
          underlayColor='#FFECB3' >
          <View>
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
    paddingVertical: 15,
    flex: 1,
    backgroundColor: '#FFB000'
  },
  list_item_reorder: {
    alignSelf: 'stretch',
    paddingVertical: 15,
    flex: 1,
    backgroundColor: '#FFECB3',
  },
  list_text: {
    fontSize: 18,
    textAlign: 'right',
    alignSelf: 'stretch',
    color: '#FFFFFF',
    margin: 10
  },
  swipe_item: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginLeft: -(Dimensions.get('window').width),
    paddingVertical: 15
  },
  swipe_icon: {
    width: 35,
    height: 35,
    marginHorizontal: 20
  }
});
