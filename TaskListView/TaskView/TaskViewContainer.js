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
      repeat: "",
      notes: "",
      show_text_input: false,
      modified: false
    };
    this._toggleTextInput = this._toggleTextInput.bind(this);
    this._modifyTask = this._modifyTask.bind(this);
    this._changeTitle = this._changeTitle.bind(this);
    this._changeDl = this._changeDl.bind(this);
    this._changeNotif = this._changeNotif.bind(this);
    this._changeRepeat = this._changeRepeat.bind(this);
    this._changeNotes = this._changeNotes.bind(this);
  }

  componentDidMount(){
    //const this_task = this.props.tasks.tasks.task_list.find(x => x.id === this.props.navigation.state.params.id)
    //console.log(this_task);
    const {data} = this.props.navigation.state.params;
    console.log({data});

    // On mount, find object in redux array using passed id and update component state with data
    this.setState({
      id: data.id,
      title: data.title,
      dl: data.deadline,
      notif: data.notifications,
      repeat: data.repeat,
      notes: data.notes
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

  _changeRepeat(new_input){
      this.setState({
        repeat: new_input,
        modified: true
      });
  }

  _changeNotes(new_input){
      this.setState({
        notes: new_input,
        modified: true
      });
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
    _changeRepeat={(repeat) => this._changeRepeat(repeat)}
    _changeNotes={(notes) => this._changeNotes(notes)}
    title={this.state.title}
    dl={this.state.dl}
    repeat={this.state.repeat}
    notif={this.state.notif}
    notes={this.state.notes}
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
