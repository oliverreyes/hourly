from HourlyAPI import app, db
from HourlyAPI.models import Task, UserSchema, TaskSchema
from flask import Flask, jsonify, request, abort

task_schema = TaskSchema()
tasks_schema = TaskSchema(many=True)

@app.route('/')
@app.route('/index')
def index():
    return "WAZZZZUUUUUP"

# API call to get entire task list from database
# TODO try, except to catch exceptions
@app.route('/get_tasks', methods=['GET'])
def get_tasks():
    tasks = Task.query.all()
    result = tasks_schema.dump(tasks)
    return jsonify(result.data)

# API call to create a new task in the database
@app.route('/create_task', methods=['POST'])
def create_task():
    print(request.get_json(force=True))
    if not request.get_json(force=True) or not 'title' in request.get_json(force=True):
        abort(400)
    data = request.get_json(force=True)

    new_task = Task()
    new_task.title = data.get('title')
    new_task.deadline = data.get('deadline')
    new_task.notifications = data.get('notifications')
    new_task.repeat = data.get('repeat')
    new_task.notes = data.get('notes')
    print(new_task)

    db.session.add(new_task)
    db.session.commit()

    result = task_schema.dump(new_task)

    return jsonify(result.data)

# API call to remove a task from the database
@app.route('/delete_task/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    print("Deleting... ")
    print(task_id)
    #if not (Task.query.filter(Task.id == )):
        #abort(400)

    task_to_delete = Task.query.get(task_id)
    Task.query.filter(Task.id == task_id).delete()
    db.session.commit()

    result = task_schema.dump(task_to_delete)

    return jsonify(result)
