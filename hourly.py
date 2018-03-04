from HourlyAPI import app, db
from HourlyAPI.models import User, Task


# create shell context for flask shell
@app.shell_context_processor
def make_shell_context():
    return {'db': db, 'User': User, 'Task': Task}
