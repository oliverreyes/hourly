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
        task_list: action.task_list
       }
    case CREATE_TASK:
      return [
        ...state,
        {
          title: action.title
        }
      ]
    default:
      return state
  }
}

const rootReducer = combineReducers({
  tasks
})

export default rootReducer
