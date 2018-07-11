import { StackNavigator } from 'react-navigation';
import TaskListViewContainer from '../TaskListView/TaskListViewContainer';
import TaskViewContainer from '../TaskListView/TaskView/TaskViewContainer';

/**
  * Navigator component
  * @prop {}
  * @return
  */
const TaskStack = StackNavigator(
  {
    Tasks: {
      screen: TaskListViewContainer,
    },
    TaskView: {
      screen: TaskViewContainer,
    },
  },
  {
    initialRouteName: 'Tasks'
  }
);

export default TaskStack;
