from HourlyAPI import db, ma

# SQLAlchemy Models
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    email = db.Column(db.String(120), index=True, unique=True)
    password_hash = db.Column(db.String(128))

    def __repr__(self):
        return '<User {}>'.format(self.username)

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(64), index=True)
    deadline = db.Column(db.DateTime, index=True)
    notifications = db.Column(db.Boolean)
    exp = db.Column(db.Integer, index=True)
    status = db.Column(db.String(16), index=True)
    order = db.Column(db.Integer, index=True)

    def __repr__(self):
        return '<Task {}'.format(self.title)

# Marshmallow Schemas based on above models
class UserSchema(ma.ModelSchema):
    class Meta:
        model = User

class TaskSchema(ma.ModelSchema):
    class Meta:
        model = Task
