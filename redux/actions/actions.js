/* Action types */
export const REQUEST_TASKS = 'REQUEST_TASKS'
export const REQUEST_SINGLE_TASK = 'REQUEST_SINGLE_TASK'
export const RECEIVE_TASKS = 'RECEIVE_TASKS'
export const CREATE_TASK = 'CREATE_TASK'
export const DELETE_TASK = 'DELETE_TASK'
export const MODIFY_TASK = 'MODIFY_TASK'
export const REORDER_TASK = 'REORDER_TASK'
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
export function createTask(new_task) {
  return {
    type: CREATE_TASK,
    payload: new_task
  }
}

/* DELETE a task from store */
export function deleteTask(task_id) {
  return {
    type: DELETE_TASK,
    payload: task_id
  }
}

/* Modify a task from store */
export function modifyTask(task_id, content) {
  return {
    type: MODIFY_TASK,
    payload: content,
    task_id
  }
}

/* Reorder a task  */
export function reorderTask(old_pos, new_pos) {
  return {
    type: REORDER_TASK,
    payload: { old_pos, new_pos }
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

export function postTask(input) {
  console.log(input);
  return async (dispatch) => {
    try {
      console.log("POSTING");
      console.log(input);
      let response = await fetch(
        'http://192.168.1.114.xip.io:5000/create_task', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            title: input,
            deadline: null,
            notifications: false,
            exp: 5,
            status: "todo"
          }),
        });
      let response_json = await response.json();
      let post_task = await dispatch(createTask(response_json));
      console.log(post_task);
    } catch (error) {
      console.error(error);
    }
  }
}

export function removeTask(task_id) {
  console.log(task_id);
  return async (dispatch) => {
    try {
      console.log("REMOVING");
      let response = await fetch(
        'http://192.168.1.114.xip.io:5000/delete_task/'+task_id, {
          method: 'DELETE'
        });
      let response_json = await response.json();
      console.log(response_json);
      let deleted_id = await dispatch(deleteTask(task_id));

    } catch (error) {
      console.error(error);
    }
  }
}

export function putTask(task_id, input_title, input_dl, input_notif, input_exp, input_status, input_order ) {
  console.log(task_id);
  return async (dispatch) => {
    try {
      console.log("UPDATING");
      let response = await fetch(
        'http://192.168.1.114.xip.io:5000/update_task/'+task_id, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            title: input_title,
            deadline: input_dl,
            notifications: input_notif,
            exp: input_exp,
            status: input_status
          }),
        });
      let response_json = await response.json();
      console.log(response_json[0]);
      let modded_task = await dispatch(modifyTask(task_id, response_json[0]));
      console.log(modded_task);

    } catch (error) {
      console.error(error);
    }
  }
}

export function shuffleTask(id_array, old_pos, new_pos) {
  let copy_array = id_array.slice();
  console.log(copy_array);
  copy_array.splice(new_pos, 0, copy_array.splice(old_pos, 1)[0]);
  console.log(copy_array);
  return async (dispatch) => {
    try {
      console.log("Shuffling");
      let response = await fetch(
        'http://192.168.1.114.xip.io:5000/reorder_tasks', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(copy_array),
        });
      let response_json = await response.json();
      console.log(response_json);
      let reorder_task = await dispatch(reorderTask(old_pos, new_pos));
      console.log(reorder_task);

    } catch (error) {
      console.error(error);
    }
  }
}
