# Import necessary libraries
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_mail import Mail
from flask_bcrypt import Bcrypt

# Initialize Flask app
app = Flask(__name__)

app.config['SECRET_KEY'] = '5791628bb0b13ce0c676dfde280ba245'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///agriconnect.db'
app.config['DEFAULT_PASSWORD'] = 'Admin'
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)

# handling login 
login_manager = LoginManager(app)
login_manager.login_view = 'login'
login_manager.login_message_category = 'info'

# configuring smtp server
app.config['MAIL_SERVER'] = 'smtp.googlemail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'jnmajanga@gmail.com'
app.config['MAIL_PASSWORD'] = 'uxyv kpdt xbhh aiie'
mail = Mail(app)

# Main function to run the Flask app
from agriconnect import routes