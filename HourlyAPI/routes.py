from HourlyAPI import app, db
from HourlyAPI.models import Task, UserSchema, TaskSchema
from flask import Flask, jsonify, request, abort
# from sqlalchemy.sql.expression import func
from sqlalchemy import func

task_schema = TaskSchema()
tasks_schema = TaskSchema(many=True)


@app.route('/')
@app.route('/index')
def index():
    return "HOURLY"


# API call to get entire task list from database
# TODO try, except to catch exceptions
@app.route('/get_tasks', methods=['GET'])
def get_tasks():
    tasks = Task.query.order_by(Task.order).all()
    result = tasks_schema.dump(tasks)
    return jsonify(result.data)


# API call to create a new task in the database
@app.route('/create_task', methods=['POST'])
def create_task():
    print(request.get_json(force=True))
    if not request.get_json(force=True) or not 'title' in request.get_json(force=True):
        abort(400)
    payload = request.get_json(force=True)

    order = db.session.query(db.func.max(Task.order)).scalar()
    print(order)
    new_order = order + 1
    print(new_order)

    new_task = Task()
    new_task.title = payload.get('title')
    new_task.deadline = payload.get('deadline')
    new_task.notifications = payload.get('notifications')
    new_task.exp = payload.get('exp')
    new_task.status = payload.get('status')
    new_task.order = new_order
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
    # if not (Task.query.filter(Task.id == )):
    # abort(400)

    task_to_delete = Task.query.get(task_id)
    # subtract 1 from order of following tasks
    affected_tasks = Task.query.filter(Task.order > task_to_delete.order)
    for task in affected_tasks:
        task.order = task.order - 1
    Task.query.filter(Task.id == task_id).delete()
    db.session.commit()

    result = task_schema.dump(task_to_delete)

    return jsonify(result)


# API call to update existing task
@app.route('/update_task/<int:task_id>', methods=['PUT'])
def update_task(task_id):
    print("Updating...")
    print(task_id)

    # Get payload
    payload = request.get_json(force=True)

    # Query specified task
    task_to_update = Task.query.get(task_id)
    # Replace content in DB with payload
    task_to_update.title = payload.get('title')
    task_to_update.deadline = payload.get('deadline')
    task_to_update.notifications = payload.get('notifications')
    task_to_update.exp = payload.get('exp')
    task_to_update.status = payload.get('status')

    print(task_to_update)
    db.session.commit()

    result = task_schema.dump(task_to_update)

    return jsonify(result)


# Update reorder values using passed id array
@app.route('/reorder_tasks', methods=['PUT'])
def reorder_tasks():
    try:
        print("Reordering...")
        payload = request.get_json(force=True)
        print(payload)
        new_index = 0
        for id in payload:
            # Query specified task
            task = Task.query.get(id)
            task.order = new_index
            new_index += 1
            print(task)
            db.session.commit()
    except Exception as e:
        print("Reordering error {}".format(e))
    return "DONE"
