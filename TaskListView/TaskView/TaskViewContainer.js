import React, { Component } from 'react';
import { connect } from 'react-redux';
import TaskView from './TaskView';
import { editTask } from '../../redux/actions/actions';

/**
  * Container component
  * @prop {}
  * @return
  */
class TaskViewContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      title: "",
      dl: "",
      notif: "",
      exp: "",
      //completed: "",
      show_text_input: false,
      modified: false
    };
    this._toggleTextInput = this._toggleTextInput.bind(this);
    this._editTask = this._editTask.bind(this);
    this._changeTitle = this._changeTitle.bind(this);
    this._changeDl = this._changeDl.bind(this);
    this._changeNotif = this._changeNotif.bind(this);
    this._changeExp = this._changeExp.bind(this);
    //this._changeCompleted = this._changeCompleted.bind(this);
  }

  componentDidMount(){
    //const this_task = this.props.tasks.tasks.task_list.find(x => x.id === this.props.navigation.state.params.id)
    //console.log(this_task);
    const {data} = this.props.navigation.state.params;

    // On mount, find object in redux array using passed id and update component state with data
    this.setState({
      id: data.id,
      title: data.title,
      dl: data.deadline,
      notif: data.notifications,
      exp: data.exp,
      completed: data.completed
    });
  }

  _toggleTextInput(){
    this.setState(prevState => ({
      show_text_input: !prevState.show_text_input
    }));
  }

  _changeTitle(new_input){
      this.setState({
        title: new_input,
        modified: true
      });
  }

  _changeDl(new_input){
      this.setState({
        dl: new_input,
        modified: true
      });
  }

  _changeNotif(new_input){
      this.setState({
        notif: new_input,
        modified: true
      });
  }

  _changeExp(new_input){
      this.setState({
        exp: new_input,
        modified: true
      });
  }
/*
  _changeCompleted(new_input){
      this.setState({
        completed: new_input,
        modified: true
      });
  }
  */
  _editTask(){
    const data = {
      id: this.state.id,
      title: this.state.title,
      deadline: this.state.dl,
      notifications: this.state.notif,
      exp: this.state.exp,
      //completed: this.state.completed
    };
    this.props.editTask(data);
    this.setState({
      modified: false
    });
  }

  render() {
    return <TaskView /*{...this.props}*/
    _editTask={this._editTask}
    _toggleTextInput={() => this._toggleTextInput()}
    show_text_input={this.state.show_text_input}
    _changeTitle={(title) => this._changeTitle(title)}
    _changeDl={(dl) => this._changeDl(dl)}
    _changeNotif={(notif) => this._changeNotif(notif)}
    _changeExp={(exp) => this._changeExp(exp)}
    //_changeCompleted={(status) => this._changeCompleted(status)}
    title={this.state.title}
    dl={this.state.dl}
    exp={this.state.exp}
    notif={this.state.notif}
    //completed={this.state.completed}
    modified={this.state.modified} />;
  }
}

const mapStateToProps = tasks => {
  return { tasks }
};

const bindActionsToDispatch = dispatch => ({
  editTask : (data) => dispatch(editTask(data))
});

export default TaskViewContainer = connect(mapStateToProps, bindActionsToDispatch)(TaskViewContainer);
