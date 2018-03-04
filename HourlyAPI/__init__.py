from flask import Flask
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_migrate import Migrate

app = Flask(__name__)
#app = Flask(__name__, instance_relative_config=True)
#read and apply config file
app.config.from_object(Config)
#app.config.from_pyfile('config.py', silent=True)
db = SQLAlchemy(app)
ma = Marshmallow(app)
migrate = Migrate(app, db)


from HourlyAPI import routes, models
