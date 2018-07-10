import React, { Component } from 'react';
import { connect } from 'react-redux';
import TaskView from './TaskView';
import { putTask } from '../../redux/actions/actions';


class TaskViewContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      title: "",
      dl: "",
      notif: "",
      exp: "",
      status: "",
      show_text_input: false,
      modified: false
    };
    this._toggleTextInput = this._toggleTextInput.bind(this);
    this._modifyTask = this._modifyTask.bind(this);
    this._changeTitle = this._changeTitle.bind(this);
    this._changeDl = this._changeDl.bind(this);
    this._changeNotif = this._changeNotif.bind(this);
    this._changeExp = this._changeExp.bind(this);
    this._changeStatus = this._changeStatus.bind(this);
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
      status: data.status
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

  _changeStatus(new_input){
      this.setState({
        status: new_input,
        modified: true
      });
  }

  _modifyTask(){
    this.props.putTask(
      this.state.id,
      this.state.title,
      this.state.dl,
      this.state.notif,
      this.state.exp,
      this.state.status);
    this.setState({
      modified: false
    });
  }

  render() {
    return <TaskView {...this.props}
    _modifyTask={this._modifyTask}
    _toggleTextInput={() => this._toggleTextInput()}
    show_text_input={this.state.show_text_input}
    _changeTitle={(title) => this._changeTitle(title)}
    _changeDl={(dl) => this._changeDl(dl)}
    _changeNotif={(notif) => this._changeNotif(notif)}
    _changeExp={(exp) => this._changeExp(exp)}
    _changeStatus={(status) => this._changeStatus(status)}
    title={this.state.title}
    dl={this.state.dl}
    exp={this.state.exp}
    notif={this.state.notif}
    status={this.state.status}
    modified={this.state.modified} />;
  }
}

const mapStateToProps = tasks => {
  return { tasks }
};

const bindActionsToDispatch = dispatch =>
(
  {
    putTask : (task_id, input_title, input_dl, input_notif, input_repeat, input_notes ) =>
    dispatch(putTask(task_id, input_title, input_dl, input_notif, input_repeat, input_notes))
  }
);

export default TaskViewContainer = connect(mapStateToProps, bindActionsToDispatch)(TaskViewContainer);
