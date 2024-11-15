from config import db
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates

class Boba(db.Model, SerializerMixin):
    __tablename__ = "bobas"

    serialize_rules=(
        '-milk_teas.boba',
        '-milk_teas.tea_item.milk_teas', #double check to make sure this should have an s 
        '-milk_teas.tea_item.boba',
        '-milk_teas.tea_item_id',
        '-milk_teas.boba_id',
        '-tea_items'
    ) #slims down our jsonified object and specifies it

    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String())

    milk_teas = db.relationship("MilkTea", back_populates="boba", cascade="all, delete-orphan") 
    # double check to make sure name is registered right
    tea_items = db.relationship("TeaItem", secondary="milk_teas", back_populates="bobas")

    @validates("name")
    def validate_name(self, key, name):
        if name == "":
            raise ValueError("Name cannot be blank")
        
        return name
    # def to_dict(self):
    #     return {
    #         "id": self.id, 
    #         "name": self.name
    #     }

    def __repr__(self):
        return f'<Boba id={self.id} name={self.name}>'