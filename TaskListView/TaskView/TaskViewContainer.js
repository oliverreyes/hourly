import React, { Component } from 'react';
import { ActionSheetIOS } from 'react-native';
import { connect } from 'react-redux';
import TaskView from './TaskView';
import { deleteTask, editTask } from '../../redux/actions/actions';
import moment from 'moment';

/**
  * Container component
  * @prop {}
  * @return
  */
class TaskViewContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      title: '',
      dl: '',
      notif: false,
      exp: '',
      priority: '',
      show_input: false,
      show_picker: false,
      modified: false,
      new_dl: new Date(),
      today: ''
    };
    this._editTask = this._editTask.bind(this);
    this._deleteTask = this._deleteTask.bind(this);
    this._toggleTextInput = this._toggleTextInput.bind(this);
    this._togglePicker = this._togglePicker.bind(this);
    this._changeTitle = this._changeTitle.bind(this);
    //this._changeDl = this._changeDl.bind(this);
    this._setNotif = this._setNotif.bind(this);
    this._setExp = this._setExp.bind(this);
    this._setDeadline = this._setDeadline.bind(this);
    //this._changeCompleted = this._changeCompleted.bind(this);
  }

  componentDidMount(){
    const {data} = this.props.navigation.state.params;
    let deadline = data.deadline;
    let priority = null;
    if (data.deadline === null){
      deadline = 'None';
    }
    else {
      deadline = deadline.toString().slice(0,10);
      deadline = moment(deadline,'YYYY-MM-DD').format('ddd MMM DD YYYY');
    }
    console.log(deadline);
    if (data.exp === 5){
      priority = 'Low';
    }
    else if (data.exp === 10){
      priority = 'Medium';
    }
    else {
      priority = 'High';
    }
    // On mount, find object in redux array using passed id and update component state with data
    this.setState({
      id: data.id,
      title: data.title,
      dl: deadline,
      notif: data.notifications,
      exp: data.exp,
      priority: priority,
      today: new Date()
    });
  }

  _toggleTextInput(){
    this.setState(prevState => ({
      show_input: !prevState.show_input
    }));
  }

  _togglePicker(){
    console.log("SHOW PICKER " + this.state.show_picker);
    this.setState(prevState => ({
      show_picker: !prevState.show_picker
    }));
  }

  _changeTitle(new_input){
      this.setState({
        title: new_input,
        modified: true
      });
  }

  _setNotif(bool){
      this.setState({
        notif: bool,
        modified: true
      });
  }

  _setExp(){
    ActionSheetIOS.showActionSheetWithOptions({
      options: ['Low', 'Medium', 'High', 'Cancel'],
      cancelButtonIndex: 3
    },
    (btnIndex) => {
      if (btnIndex === 0){
        this.setState({
          exp: 5,
          priority: 'Low',
          modified: true
        });
      }
      else if (btnIndex === 1){
        this.setState({
          exp: 10,
          priority: 'Medium',
          modified: true
        });
      }
      else if (btnIndex === 2){
        this.setState({
          exp: 15,
          priority: 'High',
          modified: true
        });
      }
    }
    );
  }

  _setDeadline(newDate){
    console.log(newDate);
    this.setState({
      new_dl: newDate,
      modified: true,
      //show_picker: false
    });
  }
  /**
   * Deletes task based on id and shifts view back to list.
   */
  _deleteTask() {
    if (!this.props.task_data[this.state.id].isTemp){
      this.props.deleteTask(this.state.id);
      this.props.navigation.goBack();
    }
  }

  _editTask(){
    let data = {
      id: this.state.id,
      title: this.state.title,
      deadline: this.state.dl,
      notifications: this.state.notif,
      exp: this.state.exp,
      //completed: this.state.completed
    };
    if (this.state.show_picker){
      const stringDate = this.state.new_dl.toString().substr(0,15);
      console.log("STRING DATE: " + stringDate);
      data = { ...data,
        deadline: this.state.new_dl
      };
      this.setState({
        dl: stringDate,
        show_picker: false
      });
    }
    this.props.editTask(data);
    this.setState({
      modified: false
    });
  }

  render() {
    return <TaskView /*{...this.props}*/
    _editTask={this._editTask}
    _deleteTask={this._deleteTask}
    _toggleTextInput={() => this._toggleTextInput()}
    show_input={this.state.show_input}
    _togglePicker={() => this._togglePicker()}
    show_picker={this.state.show_picker}
    _changeTitle={(title) => this._changeTitle(title)}
    _setDeadline={(new_dl) => this._setDeadline(new_dl)}
    _setNotif={(notif) => this._setNotif(notif)}
    _setExp={this._setExp}
    title={this.state.title}
    dl={this.state.dl}
    new_dl={this.state.new_dl}
    notif={this.state.notif}
    modified={this.state.modified}
    today={this.state.today}
    priority={this.state.priority} />;
  }
}

const mapStateToProps = ({ tasks }) =>
  ({
    task_data: tasks.task_list.byId
  });

const bindActionsToDispatch = dispatch => ({
  editTask : (data) => dispatch(editTask(data)),
  deleteTask : (task_id) => dispatch(deleteTask(task_id))
});

export default TaskViewContainer = connect(mapStateToProps, bindActionsToDispatch)(TaskViewContainer);
