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
    this.state = {
      task_id: ""
    };
    this._deleteTask = this._deleteTask.bind(this);
    this._getSelectedId = this._getSelectedId.bind(this);
  }

  _deleteTask(){
    const task_id = this.state.task_id;
    this.props.removeTask(task_id);
  }

  _getSelectedId() {
    this.setState({
      task_id: this.props.item.id
    });
    console.log(this.state.task_id);
    console.log(this.props.item.id);
  }

  render() {
    return <SwipeableListItem {...this.props} _deleteTask={this._deleteTask} item={this.props.item} navigation={this.props.navigation} _getSelectedId={this._getSelectedId} />;
  }
}

const mapStateToProps = tasks => {
  return { tasks }
};

const bindActionsToDispatch = dispatch =>
(
  {
    removeTask : (task_id) => dispatch(removeTask(task_id))
  }
);

export default SwipeableListItemContainer = connect(mapStateToProps, bindActionsToDispatch)(SwipeableListItemContainer);
