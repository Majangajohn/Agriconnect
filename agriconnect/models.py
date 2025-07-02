# Import necessary libraries
from datetime import datetime
from agriconnect import db, login_manager,app
from flask_login import UserMixin
from itsdangerous import URLSafeTimedSerializer as Serializer


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    image_file = db.Column(db.String(20), nullable=False, default='default.jpg')
    create_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    password = db.Column(db.String(60), nullable=False , default = 'Admin')
    active = db.Column(db.String(1), nullable=False, default ='N')
    
    def get_set_reset_token(self, expires_sec=1800):
        s = Serializer(app.config['SECRET_KEY'])
        return s.dumps({'user_id': self.id})
    
    @staticmethod
    def verify_set_reset_token(token, expires_sec=1800):
        s = Serializer(app.config['SECRET_KEY'])
        try:
            user_id = s.loads(token, expires_sec)['user_id']
        except:
            return None
        return User.query.get(user_id)

    def __repr__(self):
        return f"User('{self.username}', '{self.email}', '{self.image_file}')"
    
class Farmer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), nullable=False) 
    email = db.Column(db.String(120), unique=True)
    contact = db.Column(db.String(12),unique = True , nullable=False)
    county = db.Column(db.String(120),nullable=False)
    country = db.Column(db.String(120), nullable=False)
    location = db.Column(db.String(120),nullable=False)
    land_size = db.Column(db.Float(10), nullable = False)
    soil_composition = db.Column(db.String, nullable = False)
    create_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    password = db.Column(db.String(60), nullable=False , default = 'Admin')
    active = db.Column(db.String(1), nullable=False, default ='N')
    profile = db.Column(db.String(20), nullable=False, default='default.jpg')
    order = db.relationship('Soil_Composition',backref = 'soil_nutrients', lazy=True)
    stocks = db.relationship('Stocks',backref = 'farmer_stocks', lazy=True)
    orders = db.relationship('Order',backref = 'farmer_orders', lazy=True)

    def __repr__(self):
        return f"Farmer('{self.name}', '{self.email}', '{self.location}')"
    
class Soil_Composition(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    farmer_id = db.Column(db.Integer, db.ForeignKey('farmer.id'))
    description = db.Column(db.String, nullable = False)
    ph_level = db.Column(db.Float(10), nullable = False)
    nitrogen = db.Column(db.Float(10), nullable = False)
    potassium = db.Column(db.Float(10), nullable = False)
    phosphorus = db.Column(db.Float(10), nullable = False)
    create_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def __repr__(self):
        return f"Soil_Composition('{self.ph_level}', '{self.nitrogen}', '{self.potassium}')"

class Supplier(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    company_name = db.Column(db.String(100), unique=True, nullable = False)
    email = db.Column(db.String(120), unique = True, nullable = False)
    contact = db.Column(db.String(12), unique = True, nullable = False)
    county = db.Column(db.String(120),nullable=False)
    country = db.Column(db.String(120), nullable=False)
    location = db.Column(db.String(120),nullable=False)
    services = db.Column(db.String(120),nullable=False)
    create_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    logo = db.Column(db.String(20), nullable=False, default='default.jpg')
    password = db.Column(db.String(60), nullable=False , default = 'Admin')
    active = db.Column(db.String(1), nullable=False, default ='N')
    stocks = db.relationship('Stocks',backref = 'supplier_stocks', lazy=True)
    orders = db.relationship('Order',backref = 'supplier_orders', lazy=True)

    def __repr__(self):
        return f"Supplier('{self.company_name}', '{self.email}', '{self.contact}')"
    
class Stocks(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    farmer_id = db.Column(db.Integer, db.ForeignKey('farmer.id'))
    supplier_id = db.Column(db.Integer, db.ForeignKey('supplier.id'))
    product_details = db.Column(db.String(120), nullable = False)
    quantity = db.Column(db.Float(10), nullable = False)
    uom = db.Column(db.String(10), nullable = False)
    unit_price = db.Column(db.Float(10), nullable = False)  
    currency = db.Column(db.String(10), nullable = False)   
    create_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def __repr__(self):
        return f"Order('{self.product_details}', '{self.status}', '{self.create_date}')"

class Buyer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    company_name = db.Column(db.String(100), nullable = False, unique = True)
    email = db.Column(db.String(100), unique = True, nullable = False)
    contact = db.Column(db.String(12), unique = True, nullable = False)
    create_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    logo = db.Column(db.String(20), nullable=False, default='default.jpg')
    password = db.Column(db.String(60), nullable=False , default = 'Admin')
    active = db.Column(db.String(1), nullable=False, default ='N')

    def __repr__(self):
        return f"Buyer('{self.company_name}', '{self.email}', '{self.contact}')"

class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    farmer_id = db.Column(db.Integer, db.ForeignKey('farmer.id'))
    supplier_id = db.Column(db.Integer, db.ForeignKey('supplier.id'))
    product_details = db.Column(db.String(120), nullable = False)    
    status = db.Column(db.String(1),nullable = False)
    create_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def __repr__(self):
        return f"Order('{self.product_details}', '{self.status}', '{self.create_date}')"

class Produce(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    farmer_id = db.Column(db.Integer, db.ForeignKey('farmer.id'))
    crop_type = db.Column(db.String(50), nullable = False)
    maturity_time = db.Column(db.String(100), nullable = False)
    quantity = db.Column(db.Float(10), nullable = False)
    price = db.Column(db.Float(12), nullable = False)
    create_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def __repr__(self):
        return f"Produce('{self.crop_type}', '{self.quantity}', '{self.price}')"

class FarmingActivity(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    farmer_id = db.Column(db.Integer, db.ForeignKey('farmer.id'))
    activity_type = db.Column(db.String)
    crop_type = db.Column(db.String(120))
    date = db.Column(db.String)
    details = db.Column(db.String)
    create_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    
    def __repr__(self):
        return f"Produce('{self.crop_type}', '{self.details}', '{self.create_date}')"