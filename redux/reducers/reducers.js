import { combineReducers } from 'redux';
import {
  CREATE_TASK,
  REQUEST_TASKS,
  RECEIVE_TASKS
 } from '../actions/actions';

const tasks = (
  state = {
    isFetching: false,
    isStale: false,
    task_list: []
  }, action
) => {
  switch (action.type) {
    case REQUEST_TASKS:
      return { ...state,
        isFetching: true,
        isStale: false
      }
    case RECEIVE_TASKS:
      return { ...state,
        isFetching: false,
        isStale: false,
        task_list: action.payload
       }
    case CREATE_TASK:
      return { ...state,
        task_list: [...state.task_list, action.payload]
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  tasks
})

export default rootReducer
