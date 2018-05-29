import { combineReducers } from 'redux';
import {
  CREATE_TASK,
  REQUEST_TASKS,
  REQUEST_SINGLE_TASK,
  RECEIVE_TASKS,
  DELETE_TASK,
  MODIFY_TASK
 } from '../actions/actions';

const tasks = (
  state = {
    isFetching: false,
    isStale: false,
    task_list: {
      byId: {},
      allIds: []
    }
  }, action
) => {
  switch (action.type) {
    case REQUEST_TASKS:
      return { ...state,
        isFetching: true,
        isStale: false
      }
    case RECEIVE_TASKS:
      // Create object and array
      const tasksById = {};
      action.payload.map(task => {
        tasksById[task.id] =  task
      })
      const ids_array = action.payload.map(task => task.id);
      return { ...state,
        isFetching: false,
        isStale: false,
        task_list: {
          byId: tasksById,
          allIds: ids_array
        }
      }
    case CREATE_TASK:
      return { ...state,
        task_list: {
          ...state.task_list,
          byId: {
            ...state.task_list.byId,
            [action.payload.id] : action.payload
          },
          allIds: [
            ...state.task_list.allIds,
            action.payload.id
          ]
        }
      }
    case DELETE_TASK:
      return { ...state,
        task_list: [
          ...state.task_list.filter(task => task.id !== action.payload)
        ]
      }
    // Update matching task else return original task
    case MODIFY_TASK:
      return { ...state,
        task_list: state.task_list.map(task => task.id === action.task_id ? { ...task,
          title: action.payload.title,
          deadline: action.payload.deadline,
          notifications: action.payload.notifications,
          repeat: action.payload.repeat,
          notes: action.payload.notes }
          : task
        )
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  tasks
})

export default rootReducer
