from config import db
from sqlalchemy_serializer import SerializerMixin

class MilkTea(db.Model, SerializerMixin):
    __tablename__ = "milk_teas"

    serialize_rules=(
        '-tea_item.milk_teas',
        '-boba.tea_items', #double check to make sure this should have an s 
        '-tea_items.boba',
        '-boba.milk_teas',
        '-boba_id', #double check that this doesnt need to be tea instead
        '-tea_items_id'
    )


    id = db.Column(db.Integer(), primary_key=True)
    tea_item_id = db.Column(db.Integer(), db.ForeignKey("tea_Items.id"))
    boba_id = db.Column(db.Integer(), db.ForeignKey("bobas.id"))
    size = db.Column(db.String())

    tea_item = db.relationship("TeaItem", back_populates="milk_teas")
    boba = db.relationship("Boba", back_populates="milk_teas")


    def __repr__(self):
        return f'<MilkTea id={self.id} teaItem_id={self.tea_item_id} boba_id={self.boba_id} size={self.size}>'