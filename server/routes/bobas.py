from config import db, api
from models.models import Boba
from flask_restful import Resource
from flask import request, session
from sqlalchemy.exc import IntegrityError #check that we are actually pulling this error from our validation 

class BobasResource(Resource):
    def get(self): 
        bobas = [boba.to_dict() for boba in Boba.query.all()]
        return bobas
    
    def post(self):
        if not session.get("user_id"):
            return {"error": "Unauthorized"}, 401
        
        data = request.get_json()
        name = data.get("name")
        try:
            boba = Boba(name=name)
            db.session.add(boba)
            db.session.commit()
            return boba.to_dict(), 201
        except IntegrityError:
            return {"error": "Name has to exist"}, 422
        except ValueError as error:
            return {"error": f'{str(error)}'}, 422

api.add_resource(BobasResource, "/api/bobas")

