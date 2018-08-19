import React, { Component } from 'react';
import { PanResponder, Animated, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import SwipeableListItem from './ListItem/SwipeableListItem';
import { reorderTask, completeTask } from '../../../../redux/actions/actions';


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
      panResponder: this._swipePanResponder(),
      pan: new Animated.ValueXY(),
      //delayGesture: 40
    };
    this._completeTask = this._completeTask.bind(this);
    this._incompleteTask = this._incompleteTask.bind(this);
    this._onPress = this._onPress.bind(this);
    this._onLongPress = this._onLongPress.bind(this);
    this._swipePanResponder = this._swipePanResponder.bind(this);
    this._onReorderPress = this._onReorderPress.bind(this);
  }

  _onPress(){
    this.props.navigation.navigate('TaskView',
    { data: this.props.task_data[this.props.item] });
  }

  /* Handle response for long press on task list item
   * Sets reorder ID and toggles reorder */
  _onLongPress(){
    const this_index = this.props.task_array.indexOf(this.props.item);
    //console.log("LONGPRESS ID: " + this.props.item);
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
      if (this.props.old_index !== this_index){

        /* Set to null and toggle reorder back */
        //this.props._updateReorderIdx(null);
        //this.props._toggleReorder();

        //this.props.shuffleTask(this.props.task_array, this.props.old_index, this_index);
        this.props.reorderTask(this.props.task_array, this.props.old_index, this_index);
      }
      this.props._toggleReorder();
    }
  }
  /* Handle response for swiping task list item. Sets panResponder in state. */
  _onSwipe = () => {
    console.log("Here");

    this.setState({
      panResponder: this._swipePanResponder()
    });

    this.props._toggleScroll();
    console.log("Swiper no swiping");
  }
  /**
   * Create PanResponder for swiping
   */

  _swipePanResponder = () => PanResponder.create({
    onStartShouldSetPanResponderCapture: (e, gestureState) => false,
    onPanResponderTerminationRequest: (e, gestureState) => false,
    onMoveShouldSetPanResponderCapture: (e, gestureState) => {
      return gestureState.dx != 0 && gestureState.dy != 0;
    },
    onPanResponderMove: (e, gestureState) => {
      // The most recent move distance is gestureState.move{X,Y}
      // The accumulated gesture distance since becoming responder is
      // gestureState.d{x,y}
      //console.log(gestureState.dx, gestureState.dy);

      if (gestureState.dx > 25){
        this.props._toggleScroll(false);
        let move_x = gestureState.dx - 25;
        //this.state.pan.setValue(x: gestureState.dx, y: 0);
        this.state.pan.setValue({x: move_x, y: 0})

      }
      /*
      return Animated.event([null, {
          dx: this.state.pan.x,
          //dy: this.state.pan.y
        }
      ])(e, gestureState)
      */
    },
    onPanResponderRelease: (e, gestureState) => {
      if (gestureState.dx > 200){
        Animated.spring(
          this.state.pan,
          {toValue: {x:(Dimensions.get('window').width), y:0}}
        ).start();
        this.props._toggleScroll(true);
      }
      else {
        Animated.spring(
          this.state.pan,
          {toValue: {x:0, y:0}}
        ).start();
        this.props._toggleScroll(true);
      }


      console.log("Finished");
    },
    onPanResponderTerminate: (e, gestureState) => {
      // Another component has become the responder, so this gesture
      // should be cancelled
    },

  });


  /* Completes task by id. */
  _completeTask() {
    if (!this.props.task_data[this.props.item].isTemp){
      console.log("COMPLETE in swipe");
      this.props.completeTask(this.props.item, 'true');
    }
  }
  /* Marks task as incomplete. */
  _incompleteTask() {
    if (!this.props.task_data[this.props.item].isTemp){
      console.log("INCOMPLETE in swipe");
      this.props.completeTask(this.props.item, 'false');
    }
  }

  render() {
    //console.log(this.props.item);
    //console.log(this.state.task_data);
    console.log(this.props.task_data);
    return <SwipeableListItem
              {...this.props}
              panHandlers={this.state.panResponder.panHandlers}
              _completeTask={this._completeTask}
              _incompleteTask={this._incompleteTask}
              data={this.props.task_data[this.props.item]}
              navigation={this.props.navigation}
              _onPress={this._onPress}
              _onLongPress={this._onLongPress}
              _onSwipe={this._onSwipe}
              pan={this.state.pan}
              _onReorderPress={this._onReorderPress}
              reorder_toggle={this.props.reorder_toggle}
              idx={this.props.task_array.indexOf(this.props.item)}
              old_idx={this.props.old_index}
              is_scrolling={this.props.is_scrolling} />;
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
    completeTask : (task_id, bool) => dispatch(completeTask(task_id, bool)),
    reorderTask : (id_array, old_pos, new_pos) => dispatch(reorderTask(id_array, old_pos, new_pos))
  }
);

export default SwipeableListItemContainer = connect(mapStateToProps, bindActionsToDispatch)(SwipeableListItemContainer);
