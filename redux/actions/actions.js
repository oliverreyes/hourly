/* Action types */
export const REQUEST_TASKS = 'REQUEST_TASKS'
export const REQUEST_SINGLE_TASK = 'REQUEST_SINGLE_TASK'
export const RECEIVE_TASKS = 'RECEIVE_TASKS'
export const CREATE_TASK = 'CREATE_TASK'
export const DELETE_TASK = 'DELETE_TASK'
export const MODIFY_TASK = 'MODIFY_TASK'
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
        'http://192.168.1.134.xip.io:5000/get_tasks'
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
        'http://192.168.1.134.xip.io:5000/create_task', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            title: input,
            deadline: null,
            notifications: false,
            repeat: false,
            notes: null
          }),
        });
      let response_json = await response.json();
      console.log(response_json);
      let post_task = await dispatch(createTask(response_json));
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
        'http://192.168.1.134.xip.io:5000/delete_task/'+task_id, {
          method: 'DELETE'
        });
      let response_json = await response.json();
      console.log(response_json);
      let deleted_id = await dispatch(deleteTask(task_id));
      console.log(deleted_id);

    } catch (error) {
      console.error(error);
    }
  }
}

export function putTask(task_id, input_title, input_dl, input_notif, input_repeat, input_notes ) {
  console.log(task_id);
  return async (dispatch) => {
    try {
      console.log("UPDATING");
      let response = await fetch(
        'http://192.168.1.134.xip.io:5000/update_task/'+task_id, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            title: input_title,
            deadline: input_dl,
            notifications: input_notif,
            repeat: input_repeat,
            notes: input_notes
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
