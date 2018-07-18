import React, { Component } from 'react';
import { connect } from 'react-redux';
import InputListItem from './InputListItem/InputListItem';
//import tempIdGenerator from '../../../utils/tempIdGenerator';
import {
  fetchTasks,
  postTask,
  REQUEST_TASKS,
  RECEIVE_TASKS,
  createTask
} from '../../../redux/actions/actions';


/**
  * Container component
  * @prop {}
  * @return
  */
class InputListItemContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      show_text_input: false
    };
    this._showTextInput = this._showTextInput.bind(this);
    this._createTask = this._createTask.bind(this);
    this._changeInput = this._changeInput.bind(this);
  }

  _showTextInput(){
    this.setState(prevState => ({
      show_text_input: !prevState.show_text_input
    }));
    console.log(this.state.show_text_input);
  }

  _changeInput(new_input){
    this.setState({
      input: new_input
    });
  }

  _createTask(){
    const tempid = Date.now() * this.props.task_array.length;
    console.log(tempid);
    this.props.createTask(this.state.input, tempid);
    this.setState({
      input: "",
      show_text_input: false
    });
  }

  render() {
    return <InputListItem {...this.props} _createTask={this._createTask} _showTextInput={() => this._showTextInput()} input={this.state.input} show_text_input={this.state.show_text_input} _changeInput={(input) => this._changeInput(input)}/>;
  }
}

const mapStateToProps = ({ tasks }) => {
  return { task_array: tasks.task_list.allIds }
};

const bindActionsToDispatch = dispatch =>
(
  {
    postTask : (input) => dispatch(postTask(input)),
    createTask : (input, tempid) => dispatch(createTask(input, tempid))
  }
);

export default InputListItemContainer = connect(mapStateToProps, bindActionsToDispatch)(InputListItemContainer);
