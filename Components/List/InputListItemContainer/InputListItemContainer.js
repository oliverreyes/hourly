import React, { Component } from 'react';
import { connect } from 'react-redux';
import InputListItem from './InputListItem/InputListItem';
import {
  fetchTasks,
  postTask,
  REQUEST_TASKS,
  RECEIVE_TASKS
} from '../../../redux/actions/actions';


/* Need to set this async POST function in the actions module +
 * Call that function via dispatch from here +
 * Use the state as params for text +
 * Post it to the store, then post it to DB +
 * Update the list to reflect new task +
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
    const complete_input = this.state.input;
    this.props.postTask(complete_input);
    this.setState({
      input: "",
      show_text_input: false
    });
  }
 /*
  _createTask = async () => {
    try {
      console.log("POSTING");
      const response = await fetch(
        'http://192.168.1.108.xip.io:5000/create_task', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            title: this.state.input,
            deadline: null,
            notifications: false,
            repeat: false,
            notes: null
          }),
        });
      const responseJson = await response.json();
      if (responseJson.ok) {
        console.log("OK");
        console.log(responseJson.json());
      }
      console.log(responseJson);
      this.setState({
        input: "",
        show_text_input: false
      });
    } catch (error) {
      console.error(error);
    }
  }
*/
  render() {
    return <InputListItem {...this.props} _createTask={this._createTask} _showTextInput={() => this._showTextInput()} input={this.state.input} show_text_input={this.state.show_text_input} _changeInput={(input) => this._changeInput(input)}/>;
  }
}

const mapStateToProps = tasks => {
  return { tasks }
};

const bindActionsToDispatch = dispatch =>
(
  {
    postTask : (input) => dispatch(postTask(input))
  }
);

export default InputListItemContainer = connect(mapStateToProps, bindActionsToDispatch)(InputListItemContainer);
