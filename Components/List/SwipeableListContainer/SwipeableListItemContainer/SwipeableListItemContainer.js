import React, { Component } from 'react';
import { PanResponder, Animated } from 'react-native';
import { connect } from 'react-redux';
import SwipeableListItem from './ListItem/SwipeableListItem';
import { removeTask, reorderTask, shuffleTask } from '../../../../redux/actions/actions';


/**
  * Container component handles long press, swipe, and task delete functionality
  * @prop {integer} item task id
  * @prop {integer} old_index stored old index for reordering
  * @prop {obj} navigation navigation props
  * @props {function} _toggleScroll() sets scroll flag
  * @props {function} _updateReorderIdx() sets reorder's old index
  * @props {function} _toggleReorder() sets reorder flag
  * @props {boolean} reorder_toggle reorder flag
  * @props {array} task_array id array from redux store
  * @props {obj} task_data object containing task data from redux store
  * @props {function} removeTask calls redux action to delete task from store and DB
  * @props {function} shuffleTask calls redux action to reorder tasks in store and DB
  * @state {obj} panResponder PanResponder object
  * @state {obj} pan Animated x and y value
  * @return SwipeableListItem component
  */
class SwipeableListItemContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      panResponder: "",
      pan: new Animated.ValueXY(),
    };
    this._deleteTask = this._deleteTask.bind(this);
    this._onLongPress = this._onLongPress.bind(this);
    //this._swipePanResponder = this._swipePanResponder.bind(this);
    this._onReorderPress = this._onReorderPress.bind(this);
  }

  /* Handle response for long press on task list item
   * Sets reorder ID and toggles reorder */
  _onLongPress(){
    const this_index = this.props.task_array.indexOf(this.props.item);
    console.log("LONGPRESS ID: " + this.props.item);
    console.log("LONGPRESS INDEX: " + this_index);
    this.props._updateReorderIdx(this_index);
    this.props._toggleReorder();
  }
  /* Get and set new index in state. Call action to reorder tasks in store */
  _onReorderPress(){
    const this_index = this.props.task_array.indexOf(this.props.item);
    if (this.props.reorder_toggle){
      console.log("NEW INDEX: " + this_index);
      console.log("OLD INDEX: " + this.props.old_index);
      if (this.props.old_index !== this_index && (this.props.old_index+1 !== this_index)){

        /* Set to null and toggle reorder back */
        //this.props._updateReorderIdx(null);
        //this.props._toggleReorder();
        this.props.shuffleTask(this.props.task_array, this.props.old_index, this_index);
      }
      this.props._toggleReorder();
      /*
      else {
        this.props._updateReorderIdx(null);
        this.props._toggleReorder();
      }
      */
    }
  }
  /**
   * Handle response for swiping task list item. Sets panResponder in state.
   */
  _onSwipe(){
    this.setState({
      panResponder: this._swipePanResponder()
    });
  }
  /**
   * Create PanResponder for swiping
   */
   /*
  _swipePanResponder = () => PanResponder.create({
    onStartShouldSetPanResponderCapture: (e, gestureState) => true,
    onPanResponderTerminationRequest: (e, gestureState) => false,
    onPanResponderGrant: (e, gestureState) => {
      console.log("Granted...");
      this.state.pan.setOffset({
        x: this.state.pan.x._value
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
      //console.log(gestureState.dx, gestureState.dy);


      return Animated.event([null, {
          //dx: this.state.pan.x,
          dy: this.state.pan.x
        }
      ])(e, gestureState)
    },
    onPanResponderRelease: (e, gestureState) => {
      // The user has released all touches while this view is the
      // responder. This typically means a gesture has succeeded
      //this.state.pan.flattenOffset();
      if (this.state.task_index !== new_index){
        this.props.reorderTask(this.props.item, this.state.task_index, new_index);
      }
      else {
        Animated.spring(
          this.state.pan,
          {toValue: {x:0, y:0}}
        ).start();
      }
      this.setState({
        panResponder: ""
      });
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
  /*

  /**
   * Deletes task based on id. Calls removeTask using props from actions.js.
   */
  _deleteTask() {
    this.props.removeTask(this.props.item);
  }

  render() {
    //console.log(this.props.item);
    //console.log(this.state.task_data);
    //console.log(task_data);
    return <SwipeableListItem
              {...this.props}
              panHandlers={this.state.panResponder.panHandlers}
              _deleteTask={this._deleteTask} 
              data={this.props.task_data[this.props.item]}
              navigation={this.props.navigation}
              _onLongPress={this._onLongPress}
              pan={this.state.pan}
              _onReorderPress={this._onReorderPress}/>;
  }
}

const mapStateToProps = ({ tasks }) =>
  ({
    task_data: tasks.task_list.byId,
    task_array: tasks.task_list.allIds
  });

const bindActionsToDispatch = dispatch =>
(
  {
    removeTask : (task_id) => dispatch(removeTask(task_id)),
    shuffleTask : (id_array, old_pos, new_pos) => dispatch(shuffleTask(id_array, old_pos, new_pos))
  }
);

export default SwipeableListItemContainer = connect(mapStateToProps, bindActionsToDispatch)(SwipeableListItemContainer);
