import React, { Component } from 'react';
import { PanResponder, Animated } from 'react-native';
import { connect } from 'react-redux';
import SwipeableListItem from './ListItem/SwipeableListItem';
import { removeTask } from '../../../../redux/actions/actions';


/*
 * Need to set this async DELETE function in the actions module
 */
class SwipeableListItemContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      panResponder: this._longPressPanResponder(),
      pan: new Animated.ValueXY()
    };
    this._deleteTask = this._deleteTask.bind(this);
    this._onLongPress = this._onLongPress.bind(this);
    this._longPressPanResponder = this._longPressPanResponder.bind(this);
  }
  /**
   * Handle response for long press on task list item
   . Sets panResponder in state.
   */
  _onLongPress(){
    console.log(this.state.panResponder);
    this.setState({
      panResponder: this._longPressPanResponder()
    });
  }
  /**
   * Handle response for swiping task list item. Sets panResponder in state.
   */
  _onSwipe(){
    this.setState({
      panResponder: this._longPressPanResponder()
    });
  }
  /**
   * Create PanResponder for dragging and dropping list item.
   */
  _longPressPanResponder = () => PanResponder.create({
    //onMoveShouldSetPanResponder: (e, gestureState) => true, may only need Capture since we don't want children to get responder
    //onStartShouldSetResponderCapture: (e, gestureState) => true,
    onStartShouldSetPanResponderCapture: (e, gestureState) => true,
    onPanResponderTerminationRequest: (e, gestureState) => false,
    onPanResponderGrant: (e, gestureState) => {
      console.log("Granted...");
      this.state.pan.setOffset({
        //x: this.state.pan.x._value,
        y: this.state.pan.y._value
      });
      this.props._toggleScroll();


        // The gesture has started. Show visual feedback so the user knows
        // what is happening!

        // gestureState.d{x,y} will be set to zero now
    },
    onPanResponderMove: (e, gestureState) => {
      // The most recent move distance is gestureState.move{X,Y}
      // The accumulated gesture distance since becoming responder is
      // gestureState.d{x,y}
      console.log(gestureState.dx, gestureState.dy);
      const y_movement = gestureState.dy;
      const is_moving_down = (Math.sign(y_movement) > 0) ? true : false;
      console.log(is_moving_down);
      const spaces = mod(y_movement,150);
      console.log(spaces);

      return Animated.event([null, {
          //dx: this.state.pan.x,
          dy: this.state.pan.y
        }
      ])(e, gestureState)
    },
    onPanResponderRelease: (e, {vx, vy}) => {
      // The user has released all touches while this view is the
      // responder. This typically means a gesture has succeeded
      this.state.pan.flattenOffset();
      this.props._toggleScroll();

      console.log("Finished");
    },
    onPanResponderTerminate: (e, gestureState) => {
      // Another component has become the responder, so this gesture
      // should be cancelled
    },
    onShouldBlockNativeResponder: (e, gestureState) => {
      // Returns whether this component should block native components from becoming the JS
      // responder. Returns true by default. Is currently only supported on android.
      return true;
    },
  });

  /**
   * Deletes task based on id. Calls removeTask using props from actions.js.
   */
  _deleteTask() {
    this.props.removeTask(this.props.item);
  }

  render() {
    console.log(this.props.item);
    const task_data = this.props.task_data[this.props.item];
    console.log(this.props.task_data);
    console.log(this.props.task_data[this.props.item]);
    console.log(task_data);
    return <SwipeableListItem {...this.props} panHandlers={this.state.panResponder.panHandlers} _deleteTask={this._deleteTask} data={task_data} navigation={this.props.navigation} _onLongPress={this._onLongPress} pan={this.state.pan} />;
  }
}

/* Modulo helper */
function mod(n, m) {
  return ((n % m) + m) % m;
}

const mapStateToProps = ({ tasks }) =>
  ({ task_data: tasks.task_list.byId });

const bindActionsToDispatch = dispatch =>
(
  {
    removeTask : (task_id) => dispatch(removeTask(task_id))
  }
);

export default SwipeableListItemContainer = connect(mapStateToProps, bindActionsToDispatch)(SwipeableListItemContainer);
