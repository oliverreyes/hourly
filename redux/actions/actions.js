/* Action types */
export const REQUEST_TASKS = 'REQUEST_TASKS'
export const RECEIVE_TASKS = 'RECEIVE_TASKS'
export const CREATE_TASK = 'CREATE_TASK'
export const ERROR_FETCH = 'ERROR_FETCH'

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
    payload: json
   }
}

/* POST a new task to store */
export function createTask(new_task) {
  return {
    type: CREATE_TASK,
    payload: new_task
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

export function postTask(input) {
  console.log(input);
  return async (dispatch) => {
    try {
      console.log("POSTING");
      console.log(input);
      let response = await fetch(
        'http://192.168.1.108.xip.io:5000/create_task', {
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
      let post_task = await dispatch(createTask(response_json));
      console.log(post_task);
    } catch (error) {
      console.error(error);
    }
  }
}
