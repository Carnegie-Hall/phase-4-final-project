from config import app, db
from models.models import *

with app.app_context():
    print("deleting data...")

    Boba.query.delete()
    TeaItem.query.delete()
    MilkTea.query.delete()

    db.session.commit()

    print("Seeding data")

    boba_1 = Boba(name="Popping Limelight")
    boba_2 = Boba(name="Sparkling Lychee")
    db.session.add_all([boba_1, boba_2])
    db.session.commit()

    tea_Item_1 = TeaItem(name="Micro Sunset")
    tea_Item_2 = TeaItem(name="Winter's Coming")
    db.session.add_all([tea_Item_1, tea_Item_2])
    db.session.commit()

    milkTea_1 = MilkTea(boba_id=boba_1.id, tea_item_id=tea_Item_1.id, size="small")
    milkTea_2 = MilkTea(boba_id=boba_2.id, tea_item_id=tea_Item_2.id, size="large")

    db.session.add_all([milkTea_1, milkTea_2])
    db.session.commit()

    print("Finished seeding")