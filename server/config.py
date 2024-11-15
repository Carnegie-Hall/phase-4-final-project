from flask import Flask
from sqlalchemy import MetaData
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_restful import Api
from flask_cors import CORS
from flask_bcrypt import Bcrypt

# @app.route("/")
# def index():
#         return "Hello, World!"
app = Flask(__name__)

naming_convention = {
    "ix": 'ix_%(column_0_label)s',
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(constraint_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s"
}

app.secret_key="banaynaykey"
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
# change this to a postgres database later

db = SQLAlchemy(app=app, metadata=MetaData(naming_convention=naming_convention))

migrate = Migrate(app=app, db=db)

api = Api(app=app)

bcrypt = Bcrypt(app=app)

CORS(app)