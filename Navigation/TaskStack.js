import { StackNavigator } from 'react-navigation';
import TaskListViewContainer from '../TaskListView/TaskListViewContainer';
import TaskViewContainer from '../TaskListView/TaskView/TaskViewContainer';

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
