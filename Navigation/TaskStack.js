import { StackNavigator } from 'react-navigation';
import TaskListView from '../TaskListView/TaskListView';
import TaskView from '../TaskListView/TaskView/TaskView';

const TaskStack = StackNavigator(
  {
    Tasks: {
      screen: TaskListView,
    },
    TaskView: {
      screen: TaskView,
    },
  },
  {
    initialRouteName: 'Tasks'
  }
);

export default TaskStack;
