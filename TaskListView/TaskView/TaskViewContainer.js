import React, { Component } from 'react';
import { connect } from 'react-redux';
import TaskView from './TaskView';
import { putTask } from '../../redux/actions/actions';


class TaskViewContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      dl: "",
      notif: "",
      repeat: "",
      notes: "",
      show_text_input: false,
      type: ""
    };
    this._showTextInput = this._showTextInput.bind(this);
    this._modifyTask = this._modifyTask.bind(this);
    this._changeInput = this._changeInput.bind(this);
  }

  componentDidMount(){
    //TODO on mount, find object in redux array using passed id and update component state with data
    //this.props.navigation.state.params.id
  }

  _showTextInput(){
    this.setState(prevState => ({
      show_text_input: !prevState.show_text_input
    }));
  }

  _changeInput(new_input, type){
    if (type === title) {
      this.setState({
        title: new_input
      });
    }
    else if (type === dl) {
      this.setState({
        dl: new_input
      });
    }
    else if (type === repeat) {
      this.setState({
        repeat: new_input
      });
    }
    else if (type === notif) {
      this.setState({
        notif: new_input
      });
    }
    else if (type === notes) {
      this.setState({
        notes: new_input
      });
    }
    else {
      return;
    }
  }

  _modifyTask(){
    this.props.putTask(
      this.state.id,
      this.state.title,
      this.state.dl,
      this.state.notif,
      this.state.repeat,
      this.state.notes);
    this.setState({
      input: "",
      show_text_input: false
    });
  }

  render() {
    return <TaskView {...this.props} _modifyTask={this._modifyTask} _showTextInput={() => this._showTextInput()} input={this.state.input} type={this.state.type} show_text_input={this.state.show_text_input} _changeInput={(input, type) => this._changeInput(input)}/>;
  }
}

const mapStateToProps = tasks => {
  return { tasks }
};

const bindActionsToDispatch = dispatch =>
(
  {
    putTask : (id, title, dl, notif, repeat, notes) =>
    dispatch(modifyTasks(id, title, dl, notif, repeat, notes))
  }
);

export default TaskViewContainer = connect(mapStateToProps, bindActionsToDispatch)(TaskViewContainer);
