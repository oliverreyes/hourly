import { StackNavigator } from 'react-navigation';
import TaskListViewContainer from '../TaskListView/TaskListViewContainer';
import TaskView from '../TaskListView/TaskView/TaskView';

const TaskStack = StackNavigator(
  {
    Tasks: {
      screen: TaskListViewContainer,
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
