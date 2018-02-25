import os
#variable as relative path from any place we call it to this file
basedir = os.path.abspath(os.path.dirname(__file__))

class Config(object):
    DEBUG = True
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'this-is-the-default-password'
    SQLALCHEMY_DATABASE_URI = os.environ['DATABASE_URL']
