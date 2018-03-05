from HourlyAPI import app
from HourlyAPI.models import Task, UserSchema, TaskSchema
from flask import Flask, jsonify

task_schema = TaskSchema()
tasks_schema = TaskSchema(many=True)

@app.route('/')
@app.route('/index')
def index():
    return "WAZZZZUUUUUP"

@app.route('/get_tasks', methods=['GET'])
def get_tasks():
    tasks = Task.query.all()
    result = tasks_schema.dump(tasks)
    return jsonify(result.data)

@app.route('/create_task', methods=['POST'])
def create_task():
    if not request.json or not 'title' in request.json:
        abort(400)
    title = request.json['title']
    deadline = request.json['deadline']
    notifications = request.json['notifications']
    repeat = request.json['repeat']
    notes = request.json['notes']

    new_task = Task(title, deadline, notifications, repeat, notes)

    db.session.add(new_task)
    db.session.commit()

    return jsonify(new_task)
