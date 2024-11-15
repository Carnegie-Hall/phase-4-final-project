from config import db
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates

class TeaItem(db.Model, SerializerMixin):
    __tablename__ = "tea_Items" #why did i put this like this

    serialize_rules=(
        '-milk_teas.tea_item',
        '-milk_teas.boba.milk_teas', #double check to make sure this should have an s 
        '-milk_teas.boba.tea_items',
        '-milk_teas.tea_item_id',
        '-milk_teas.boba_id',
        '-bobas'
    )

    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(), unique=True)
    user_id = db.Column(db.Integer(), db.ForeignKey("users.id"))
    # db migrate and db upgrade before doing the user = db relationship

    user = db.relationship("User", back_populates="teaItems")
    milk_teas = db.relationship("MilkTea", back_populates="tea_item", cascade="all, delete-orphan") #check what overlaps is 
    bobas = db.relationship("Boba", secondary="milk_teas", back_populates="tea_items")  

    #ask for help understanding plural vernacular like why is this bobas and not boba

    @validates("name")
    def validate_name(self, key, name):
        if name is None: 
            raise ValueError("Name must exist")
        elif name == "":
            raise ValueError("Please enter a character for name")

        return name

    def __repr__(self):
        return f'<TeaItem id={self.id} name={self.name}>'