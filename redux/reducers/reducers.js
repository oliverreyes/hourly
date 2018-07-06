import { combineReducers } from 'redux';
import {
  CREATE_TASK,
  REQUEST_TASKS,
  REQUEST_SINGLE_TASK,
  RECEIVE_TASKS,
  DELETE_TASK,
  MODIFY_TASK,
  REORDER_TASK
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
      const id_to_delete = action.payload.toString();
      const old_state = state.task_list.byId;
      const { [id_to_delete] : value, ...new_byId } = old_state;
      return { ...state,
        task_list: {
          byId: new_byId,
          allIds: [
            ...state.task_list.allIds.filter(id => id !== action.payload)
          ]
        }
      }
    // Update corresponding task
    case MODIFY_TASK:
      return { ...state,
        task_list: { ...state.task_list,
          byId: {
            ...state.task_list.byId,
            [action.task_id] : action.payload
          }
        }
      }
    case REORDER_TASK:
      const allIds_length = state.task_list.allIds.length;
      let copy_allIds = state.task_list.allIds.slice();
      let mod_allIds = copy_allIds.filter(id => id !== action.payload.task_id);
      let new_allIds = [];
      /* Check if index is first or last in array */

      if (action.payload.new_pos !== 0 && action.payload.new_pos !== allIds_length){
        console.log("New idx not 0 or last: " + action.payload.new_pos);
        new_allIds = [...mod_allIds.slice(0, action.payload.new_pos), action.payload.task_id, ...mod_allIds.slice(action.payload.new_pos)];
      }
      else if (action.payload.new_pos === 0){
        console.log("New idx is 0");
        new_allIds = [action.payload.task_id, ...mod_allIds];
      }
      else if (action.payload.new_pos === allIds_length){
        console.log("New idx is last");
        new_allIds = [...mod_allIds, action.payload.task_id];
      }
      else {
        console.log("ERROR NEW IDX: " + action.payload.new_pos);
      }
      console.log("THIS ID: " + action.payload.task_id);
      console.log("ALL: " + new_allIds);
    
      return { ...state,
        task_list: { ...state.task_list,
          allIds: new_allIds
        }
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  tasks
})

export default rootReducer
