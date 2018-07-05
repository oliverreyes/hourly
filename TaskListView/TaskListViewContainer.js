import React, { Component } from 'react';
import { connect } from 'react-redux';
import TaskListView from './TaskListView';
import {
  fetchTasks,
  REQUEST_TASKS,
  RECEIVE_TASKS
} from '../redux/actions/actions';


class TaskListViewContainer extends Component {
  componentDidMount() {
    console.log(this.props);
    this.fetchData();
  }
  //for updating list
  /*
  componentDidUpdate(prevProps) {
    if (this.props.invalidate !== prevProps.invalidate) {

    }
  }
  */
  fetchData() {
    console.log("FETCH: " + this.props);
    this.props.fetchTasks();
  }
  render() {
    return <TaskListView {...this.props} />;
  }
}


const mapStateToProps = ({ tasks }) =>
  ({ id_array: tasks.task_list.allIds });

const bindActionsToDispatch = dispatch =>
(
  {
    fetchTasks : () => dispatch(fetchTasks())
  }
);

export default TaskListViewContainer = connect(mapStateToProps, bindActionsToDispatch)(TaskListViewContainer);
