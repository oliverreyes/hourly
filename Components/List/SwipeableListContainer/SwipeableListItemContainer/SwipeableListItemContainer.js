import React, { Component } from 'react';
import { connect } from 'react-redux';
import SwipeableListItem from './ListItem/SwipeableListItem';
import { removeTask } from '../../../../redux/actions/actions';


/*
 * Need to set this async DELETE function in the actions module
 */
class SwipeableListItemContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this._deleteTask = this._deleteTask.bind(this);
  }

  _deleteTask(){
    this.props.removeTask(this.props.item);
  }


  render() {
    console.log(this.props.item);
    console.log(this.props.task_data);
    const task_data = this.props.task_data[this.props.item];
    console.log(task_data);
    return <SwipeableListItem {...this.props} _deleteTask={this._deleteTask} data={task_data} navigation={this.props.navigation}  />;
  }
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
