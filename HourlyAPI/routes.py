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
