from config import db, api
from models.models import MilkTea
from flask_restful import Resource
from flask import request

class MilkTeasResource(Resource):
    def get(self): 
        milk_Teas = [milk_Tea.to_dict() for milk_Tea in MilkTea.query.all()]
        return milk_Teas

    def post(self):
        data = request.get_json()
        boba_id = data.get("boba_id")
        tea_Item_id = data.get("tea_Item_id")

        milk_Tea = MilkTea(boba_id=boba_id, tea_Item_id=tea_Item_id)
        db.session.add(milk_Tea)
        db.session.commit()
        return milk_Tea.to_dict(), 201

api.add_resource(MilkTeasResource, "/api/milkTeas")
