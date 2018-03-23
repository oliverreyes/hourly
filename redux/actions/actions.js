/* Action types */
export const REQUEST_TASKS = 'REQUEST_TASKS'
export const RECEIVE_TASKS = 'RECEIVE_TASKS'
export const CREATE_TASK = 'CREATE_TASK'

/* Action creators */
/* *************** */
/* Synchronous GET request to pull all tasks */
export function requestTasks() {
  return { type: REQUEST_TASKS }
}

/* When network request comes through */
export function receiveTasks(json) {
  console.log(json);
  return {
    type: RECEIVE_TASKS,
    task_list: json
   }
}

/* POST a new task to store */
export function createTask(title) {
  return { type: CREATE_TASK, title }
}

/* thunk action creator */
// Catch may cause trouble
export function fetchTasks() {
  // Dispatch method is passed as an arg to the function
  // App state is updated to inform that API call is starting
  console.log("WE IN HERE");
  return async (dispatch) => {
    try {
      let response = await fetch(
        'http://192.168.1.108.xip.io:5000/get_tasks'
      );
      let response_json = await response.json();
      console.log(response_json);
      let receive_json = await dispatch(receiveTasks(response_json));
      console.log(receive_json);
    } catch (error) {
      console.error(error);
    }
  }
}
