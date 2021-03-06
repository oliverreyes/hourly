/* Action types */
export const REQUEST_TASKS = 'REQUEST_TASKS'
export const REQUEST_SINGLE_TASK = 'REQUEST_SINGLE_TASK'
export const RECEIVE_TASKS = 'RECEIVE_TASKS'
export const CREATE_TASK = 'CREATE_TASK'
export const CREATE_TASK_COMMIT = 'CREATE_TASK_COMMIT'
export const CREATE_TASK_ROLLBACK = 'CREATE_TASK_ROLLBACK'
export const DELETE_TASK = 'DELETE_TASK'
export const DELETE_TASK_COMMIT = 'DELETE_TASK_COMMIT'
export const DELETE_TASK_ROLLBACK = 'DELETE_TASK_ROLLBACK'
export const COMPLETE_TASK = 'COMPLETE_TASK'
export const COMPLETE_TASK_COMMIT = 'COMPLETE_TASK_COMMIT'
export const COMPLETE_TASK_ROLLBACK = 'COMPLETE_TASK_ROLLBACK'
export const EDIT_TASK = 'EDIT_TASK'
export const EDIT_TASK_COMMIT = 'EDIT_TASK_COMMIT'
export const EDIT_TASK_ROLLBACK = 'EDIT_TASK_ROLLBACK'
export const REORDER_TASK = 'REORDER_TASK'
export const REORDER_TASK_ROLLBACK = 'REORDER_TASK_ROLLBACK'
export const REORDER_TASK_COMMIT = 'REORDER_TASK_COMMIT'
export const REFRESH_TASKS = 'REFRESH_TASKS'
export const ERROR_FETCH = 'ERROR_FETCH'

/* Action creators */
/* *************** */
/* Synchronous GET request to pull all tasks */
export function requestTasks() {
  return {
    type: REQUEST_TASKS
  }
}

export function requestSingleTask(task_id) {
  return {
    type: REQUEST_SINGLE_TASK,
    task_id
  }
}

/* When network request comes through */
export function receiveTasks(tasks) {
  console.log(tasks);
  return {
    type: RECEIVE_TASKS,
    payload: tasks
   }
}

/* POST a new task to store */
export function createTask(input, tempid) {
  return {
    type: CREATE_TASK,
    payload: {
      title: input,
      deadline: null,
      notifications: false,
      exp: 5,
      id: tempid,
      completed: null,
      isTemp: true
    },
    meta: {
      offline: {
        effect: {
          url: 'http://192.168.1.114.xip.io:5000/create_task',
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: input,
            notifications: false,
            exp: 5
          }),
        },
        commit: {
          type: CREATE_TASK_COMMIT,
          meta: { tempid }
        },
        rollback: {
          type: CREATE_TASK_ROLLBACK,
          meta: { tempid}
        }
      }
    }
  }
}

/* DELETE a task from store */
export function deleteTask(task_id) {
  return {
    type: DELETE_TASK,
    payload: task_id,
    meta: {
      offline: {
        effect: {
          url: 'http://192.168.1.114.xip.io:5000/delete_task/'+task_id,
          method: 'DELETE'
        },
        commit: {
          type: DELETE_TASK_COMMIT
        },
        rollback: {
          type: DELETE_TASK_ROLLBACK
        }
      }
    }
  }
}

/* Complete/Incomplete a task */
export function completeTask(task_id, bool) {
  console.log("IN ACTION: "+ bool)
  console.log(task_id)
  return {
    type: COMPLETE_TASK,
    payload: {
      task_id,
      bool
    },
    meta: {
      offline: {
        effect: {
          url: 'http://192.168.1.114.xip.io:5000/complete_task/'+task_id+'?completed='+bool,
          method: 'PUT'
        },
        commit: {
          type: COMPLETE_TASK_COMMIT
        },
        rollback: {
          type: COMPLETE_TASK_ROLLBACK,
          meta: { task_id }
        }
      }
    }
  }
}

/* Modify a task from store */
export function editTask(data) {
  console.log(data);
  return {
    type: EDIT_TASK,
    payload: {
      id: data.id,
      title: data.title,
      deadline: data.deadline,
      notifications: data.notifications,
      exp: data.exp
    },
    meta: {
      offline: {
        effect: {
          url: 'http://192.168.1.114.xip.io:5000/update_task/'+data.id,
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: data.title,
            deadline: data.deadline,
            notifications: data.notifications,
            exp: data.exp
          }),
        },
        commit: {
          type: EDIT_TASK_COMMIT,
          meta: { id: data.id }
        },
        rollback: {
          type: EDIT_TASK_ROLLBACK,
          meta: { id: data.id }
        }
      }
    }
  }
}

/* Reorder a task  */
export function reorderTask(id_array, old_pos, new_pos) {
  let copy_array = id_array.slice();
  //console.log(copy_array);
  copy_array.splice(new_pos, 0, copy_array.splice(old_pos, 1)[0]);
  //console.log(copy_array);
  return {
    type: REORDER_TASK,
    payload: { new_array: copy_array },
    meta: {
      offline: {
        effect: {
          url: 'http://192.168.1.114.xip.io:5000/reorder_tasks',
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(copy_array)
        },
        commit: {
          type: REORDER_TASK_COMMIT,
          meta: { new_array: copy_array }
        },
        rollback: { type: REORDER_TASK_ROLLBACK }
      }
    }
  }
}

/* Refresh task lists */
export function refreshTasks() {
  return {
    type: REFRESH_TASKS
  }
}

/* thunk action creator */
// Catch may cause trouble
export function fetchTasks() {
  // Dispatch method is passed as an arg to the function
  // App state is updated to inform that API call is starting
  return async (dispatch) => {
    try {
      let response = await fetch(
        'http://192.168.1.114.xip.io:5000/get_tasks'
      );
      let response_json = await response.json();
      console.log(response_json);
      // Dispatch action
      let receive_json = await dispatch(receiveTasks(response_json));

    } catch (error) {
      console.error(error);
    }
  }
}
