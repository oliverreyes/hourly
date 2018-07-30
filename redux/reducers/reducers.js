import { combineReducers } from 'redux';
import {
  CREATE_TASK,
  CREATE_TASK_COMMIT,
  CREATE_TASK_ROLLBACK,
  REQUEST_TASKS,
  REQUEST_SINGLE_TASK,
  RECEIVE_TASKS,
  DELETE_TASK,
  DELETE_TASK_COMMIT,
  DELETE_TASK_ROLLBACK,
  COMPLETE_TASK,
  COMPLETE_TASK_COMMIT,
  COMPLETE_TASK_ROLLBACK,
  EDIT_TASK,
  EDIT_TASK_COMMIT,
  EDIT_TASK_ROLLBACK,
  REORDER_TASK,
  REORDER_TASK_COMMIT,
  REORDER_TASK_ROLLBACK
 } from '../actions/actions';

const tasks = (
  state = {
    isFetching: false,
    isStale: false,
    isRollback: false,
    task_list: {
      byId: {},
      allIds: [],
      prevIds: [],
      finIds: []
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
      console.log(action.payload);
      const tasksById = {};
      const ids_array = [];
      const fin_array = [];
      action.payload.map(task => {
        tasksById[task.id] =  task
      })
      action.payload.forEach(task => {
        if (task.completed === null){
          ids_array.push(task.id);
        }
        else {
          fin_array.push(task.id);
        }
      })
      console.log(ids_array);
      console.log(fin_array);
      return { ...state,
        isFetching: false,
        isStale: false,
        task_list: {
          byId: tasksById,
          allIds: ids_array,
          prevIds: ids_array,
          finIds: fin_array
        }
      }
    case CREATE_TASK:
      console.log("TEMPID: " + action.payload.id);
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
    case CREATE_TASK_COMMIT:
      const delete_id_commit = action.meta.tempid.toString();
      const { [delete_id_commit] : val_c, ...commit_byId } = state.task_list.byId;
      const ids = state.task_list.allIds.filter(id => id !== action.meta.tempid);
      const new_allIds = [...ids, action.payload.id];
      console.log("TEMPID: " + action.meta.tempid);
      console.log("ID: " + action.payload.id);
      console.log(val_c);
      console.log(commit_byId);
      console.log("new_allIDs: " + new_allIds);
      return { ...state,
        task_list: {
          ...state.task_list,
          byId: {
            ...commit_byId,
            [action.payload.id] : { ...val_c,
              id: action.payload.id,
              isTemp: false
            }
          },
          allIds: new_allIds,
          prevIds: new_allIds
        }
      }
    case CREATE_TASK_ROLLBACK:
      const delete_id_rb = action.meta.tempid.toString();
      const { [delete_id_rb] : val_rb, ...rb_byId } = state.task_list.byId;
      return { ...state,
        isRollback: true,
        task_list: { ...state.task_list,
          byId: rb_byId,
          allIds: [
            ...state.task_list.allIds.filter(id => id !== action.meta.tempid)
          ]
        }
      }
    /**
     * Delete task removes id from current id array.
     */
    case DELETE_TASK:
      //const delete_id = action.payload.toString();
      //const old_state = state.task_list.byId;
      //const { [delete_id] : value, ...del_byId } = old_state;
      return { ...state,
        task_list: { ...state.task_list,
          //byId: del_byId,
          allIds: [
            ...state.task_list.allIds.filter(id => id !== action.payload)
          ],
          //prevIds: [
          //  ...state.task_list.prevIds.filter(id => id !== action.payload)
          //]
        }
      }
    /**
     * Delete commit removes task from byId and updates history to current order.
     */
    case DELETE_TASK_COMMIT:
      const delete_id = action.payload.toString();
      const old_state = state.task_list.byId;
      const { [delete_id] : value, ...del_byId } = old_state;
      return { ...state,
        task_list: { ...state.task_list,
          byId: del_byId,
          prevIds: state.task_list.allIds
        }
      }
    /**
     * Delete rollback reverts current order back to saved history.
     */
    case DELETE_TASK_ROLLBACK:
      return { ...state,
        task_list: { ...state.task_list,
          allIds: state.task_list.prevIds
        }
      }
    /**
     * Complete task moves task from allIds to finIds
     */
    case COMPLETE_TASK:
      console.log("ID: " + action.payload.task_id)
      console.log("FINIDS: " + state.task_list.finIds)
      return { ...state,
        task_list: { ...state.task_list,
          //byId: del_byId,
          allIds: [
            ...state.task_list.allIds.filter(id => id !== action.payload.task_id)
          ],
          finIds: [action.payload.task_id, ...state.task_list.finIds]
        }
      }
    /**
     * Complete commit replaces object with payload from DB, saves new history
     */
    case COMPLETE_TASK_COMMIT:
      console.log("COMMITTING COMPLETE: ");
      console.log(action.payload);
      return { ...state,
        task_list: { ...state.task_list,
          byId: { ...state.task_list.byId,
            [action.payload.task_id] : action.payload
          },
          prevIds: state.task_list.allIds
        }
      }
    /**
     * Complete rollback reverts to history and removes task from finIds
     */
    case COMPLETE_TASK_ROLLBACK:
      return { ...state,
        task_list: { ...state.task_list,
          allIds: state.task_list.prevIds,
          finIds: [
            ...state.task_list.finIds.filter(id => id !== action.meta.task_id)
          ]
        }
      }
    /**
     * Edit title, deadline date, notifications, or priority of corresponding task.
     */
    case EDIT_TASK:
      console.log(action.payload);
      return { ...state,
        task_list: { ...state.task_list,
          byId: { ...state.task_list.byId,
            [action.payload.id] : { ...state.task_list.byId[action.payload.id],
              title: action.payload.title,
              deadline: action.payload.deadline,
              notifications: action.payload.notifications,
              exp: action.payload.exp
            },
            ["prev"+action.payload.id] : state.task_list.byId[action.payload.id]
          }
        }
      }
    /**
     * Remove previous contents of task.
     */
    case EDIT_TASK_COMMIT:
      const edited_state_c = state.task_list.byId;
      const { ["prev"+action.meta.id] : prev_val_c, ...edited_byId_c } = edited_state_c;
      console.log("COMMITTED");
      return { ...state,
        task_list: { ...state.task_list,
          byId: edited_byId_c
        }
      }
    /**
     * Replace new content with previous task content and remove previous content value.
     */
    case EDIT_TASK_ROLLBACK:
      const edited_state_rb = state.task_list.byId;
      const { ["prev"+action.meta.id] : prev_val_rb, ...edited_byId_rb } = edited_state_rb;
      return { ...state,
        task_list: { ...state.task_list,
          byId: { ...edited_byId_rb,
            [action.meta.id] : prev_val_rb
          }
        }
      }
    /**
     * Reorder reducer. Create copy of allIds array and use old and new indices
     * to arrange order of tasks in copy. Must check to see where new and old
     * indices are in relation to each other as removing id at original position
     * will affect the indices of the proceding ids.
     */
    case REORDER_TASK:
      return { ...state,
        task_list: { ...state.task_list,
          allIds: action.payload.new_array
        }
      }
    /**
     * Reorder commit sets the prevIds anchor point to the current order,
     * establishing a new baseline for future reorders.
     */
    case REORDER_TASK_COMMIT:
      console.log(action.meta.new_array);
      return { ...state,
        task_list: { ...state.task_list,
          prevIds: action.meta.new_array
        }
      }
    /**
     * Reorder rollback sets the current order back to the previously saved order.
     */
    case REORDER_TASK_ROLLBACK:
      return { ...state,
        isRollback: true,
        task_list: { ...state.task_list,
          allIds: state.task_list.prevIds
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
