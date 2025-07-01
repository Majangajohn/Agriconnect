# Import necessary libraries
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, BooleanField,FloatField,SelectField
from wtforms.validators import DataRequired, Email, ValidationError, Length, EqualTo,Regexp
from agriconnect.models import User, Farmer
from agriconnect import app

        
class LoginForm(FlaskForm):
    email = StringField('Email',
                        validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[DataRequired()])
    remember = BooleanField('Remember Me')
    submit = SubmitField('Login')

    def validate_email(self, email):
        user = User.query.filter_by(email=email.data).first()
        if user is None:
            raise ValidationError('There is no account with that email. You must first register with Ministry of Agriculture.')

class RegistrationForm(FlaskForm):
    username = StringField('Username',
                           validators=[DataRequired(), Length(min=2, max=20)])
    email = StringField('Email',
                        validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[DataRequired()])
    confirm_password = PasswordField('Confirm Password',
                                     validators=[DataRequired(), EqualTo('password')])
    submit = SubmitField('Sign Up')

    def validate_username(self, username):
        user = User.query.filter_by(username=username.data).first()
        if user:
            raise ValidationError('That username is taken. Please choose a different one.')

    def validate_email(self, email):
        user = User.query.filter_by(email=email.data).first()
        if user:
            raise ValidationError('That email is taken. Please choose a different one.')

class ConfirmRegistration(FlaskForm):
    email = StringField('Email',
                        validators=[DataRequired(), Email()])
    submit = SubmitField('Confirm Email Registration')

    def validate_email(self, email):
        user = User.query.filter_by(email=email.data).first()
        if user is None:
            raise ValidationError('There is no account with that email. You must register first.')

class SetResetPasswordForm(FlaskForm):
    password = PasswordField('Password', validators=[DataRequired()])
    confirm_password = PasswordField('Confirm Password',
                                     validators=[DataRequired(), EqualTo('password')])
    submit = SubmitField('Reset Password')

    def validate_password(self, password):
        if password.data ==  app.config['DEFAULT_PASSWORD']:
            raise ValidationError('You can not use default password again')
        
class RegisterFarmer(FlaskForm):
    username = StringField('Username',
                           validators=[DataRequired(), Length(min=2, max=20)])
    email = StringField('Email',
                        validators=[DataRequired(), Email()])
    contact = StringField('Contact', 
                          validators=[DataRequired(), Length(min=10, max=12), Regexp(r'^\d+$', message='Must be numeric')])
    county = StringField('County', 
                         validators=[DataRequired(), Length(max=120)])
    country = StringField('Country', 
                          validators=[DataRequired(), Length(max=120)])
    location = StringField('Location', 
                           validators=[DataRequired(), Length(max=120)])
    land_size = FloatField('Land Size', 
                           validators=[DataRequired()])
    soil_composition = SelectField('Soil Composition', 
                                   choices=[('loamy', 'Loamy'), ('clay', 'Clay'), ('sandy', 'Sandy'), ('silty', 'Silty')], 
                                   validators=[DataRequired()])
 
    submit = SubmitField('Register Farmer')

    def validate_email(self, email):
        farmer = Farmer.query.filter_by(email=email.data).first()
        if farmer:
            raise ValidationError('That username is taken. Please choose a different one')
    def validate_contact(self, contact):
        farmer = Farmer.query.filter_by(contact=contact.data).first()
        if farmer:
            raise ValidationError('That email is taken. Please choose a different one.')