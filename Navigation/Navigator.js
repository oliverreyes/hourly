import { TabNavigator, StackNavigator } from 'react-navigation';
//import TaskListView from '../TaskListView/TaskListView';
import GoalListView from '../GoalListView/GoalListView';
import HomeView from '../HomeView/HomeView';
//import TaskView from '../TaskListView/TaskView/TaskView';
import TaskStack from './TaskStack';

const Navigator =  TabNavigator(
  {
    Home: { screen: HomeView },
    Goals: { screen: GoalListView },
    Tasks: { screen: TaskStack },
  }
);

export default Navigator;

/*


navigationOptions: {
  headerStyle: {
    position: 'absolute',
    backgroundColor: 'transparent',
    top: 0,
    left: 0,
    right: 0
  }
}
*/
