from config import db, api
from models.models import TeaItem
from flask_restful import Resource
from flask import request, session
from sqlalchemy.exc import IntegrityError

class TeaItemsResource(Resource):
    def get(self): 
        tea_Items = [tea_Item.to_dict() for tea_Item in TeaItem.query.all()]
        
        return tea_Items
    
    def post(Self):
        data = request.get_json()
        name = data.get("name")
        try:
            tea_Item = TeaItem(name=name, user_id=session["user_id"])
            db.session.add(tea_Item)
            db.session.commit()
            return tea_Item.to_dict(), 201
        except IntegrityError:
            return {"error": "Please use a unique name"}, 422
        except ValueError as e:
            return {"error": str(e)}, 422

api.add_resource(TeaItemsResource, "/api/teaItems")

class TeaItemResource(Resource):
    def get(self, id):
        ti = TeaItem.query.get(id)
        if ti:
            return ti.to_dict(), 200
        else:
            return {"error": "Please enter a valid Tea item"}, 400,

    def patch(self, id):
        data = request.get_json()
        ti = TeaItem.query.get(id)
        
        if ti.user.id != session["user_id"]:
            return {"error": "unauthorized"}, 401

        try:
            for key in data.keys():
                if hasattr(ti, key):
                    setattr(ti, key, data.get(key))
            db.session.add(ti)
            db.session.commit()
            return ti.to_dict(), 201
        except IntegrityError:
            return {"error": "Please use a unique name"}, 422
        except ValueError as e:
            return {"error": str(e)}, 422
        
    def delete(self, id):
        ti = TeaItem.query.get(id)

        if not ti:
            return {"error": "Please enter a valid Tea item"}, 400
        elif ti.user.id != session["user_id"]:
            return {"error": "Unauthorized"}, 401
                    
        db.session.delete(ti)
        db.session.commit()
        return {}, 204
        
api.add_resource(TeaItemResource, "/api/teaItems/<int:id>")