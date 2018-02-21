from flask import Flask

app = Flask(__name__)

from HourlyAPI import routes
