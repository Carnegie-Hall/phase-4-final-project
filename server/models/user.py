from config import db, bcrypt
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property

class User(db.Model, SerializerMixin):
  __tablename__ = "users"


  id = db.Column(db.Integer(), primary_key=True)
  username = db.Column(db.String(), unique=True)
  _password_hash = db.Column(db.String())

  teaItems = db.relationship("TeaItem", back_populates="user")

  serialize_rules=(
    "-_password_hash",
    "-teaItems.user"
  )


  @hybrid_property
  def password_hash(self):
    raise Exception("Cannot Access Password Hash")
  
  @password_hash.setter
  def password_hash(self, password):
    pw_hash = bcrypt.generate_password_hash(password)
    self._password_hash = pw_hash.decode('utf-8')

  def authenticate(self, password):
    return bcrypt.check_password_hash(self._password_hash, password)
  
  def __repr__(self):
    return f'<User id={self.id} username={self.username}>'
  