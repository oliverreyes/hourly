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
export function receiveTasks(task_list) {
  return { type: RECEIVE_TASKS, task_list }
}

/* POST a new task to DB */
export function createTask(title) {
  return { type: CREATE_TASK, title }
}
