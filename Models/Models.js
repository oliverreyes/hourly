
const TaskModel = {
  name: 'Task',
  properties: {
    title: 'string',
    deadline: 'date',
    notifications: 'bool',
    repeat: 'bool',
    notes: 'data'
  }
};

export default TaskModel;
