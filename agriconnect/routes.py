# Import necessary libraries
from flask import render_template, redirect, url_for, request, flash
from agriconnect import app, bcrypt, db, mail
from agriconnect.forms import (LoginForm, ConfirmRegistration, RegistrationForm, 
SetResetPasswordForm, RegisterTypeForm)
from agriconnect.models import User
from flask_login import current_user, login_user, logout_user
from flask_mail import Message

# Route for home page
@app.route("/")
@app.route("/home")
def home():
    return render_template('layout.html', title='Home')

# Route for login page
@app.route("/login", methods = ['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('portal'))
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()
        if user and form.password.data == app.config['DEFAULT_PASSWORD'] and user.active == 'N' :
            return redirect(url_for('confirm_registration'))

        elif user and form.password.data != app.config['DEFAULT_PASSWORD'] and\
        bcrypt.check_password_hash(user.password, form.password.data):
            login_user(user, remember=form.remember.data)
            next_page = request.args.get('next')
            return redirect(next_page) if next_page else redirect(url_for('portal'))
        else:
            flash('Login Unsuccessful. Please check email and password', 'danger')
    return render_template('login.html', title='Login', form = form)

# Route for register page
@app.route("/register", methods=['GET', 'POST'])
def register():
    if current_user.is_authenticated:
        return redirect(url_for('portal'))
    form = RegistrationForm()
    register_type_form = RegisterTypeForm()
    if form.validate_on_submit():
        hashed_password = bcrypt.generate_password_hash(form.password.data).decode('utf-8')
        user = User(username=form.username.data, email=form.email.data, password=hashed_password)
        db.session.add(user)
        db.session.commit()
        flash('Your account has been created! You are now able to log in', 'success')
        return redirect(url_for('login'))
    if register_type_form.validate_on_submit():
        return redirect(url_for('register'))
    return render_template('register.html', title='Register', form=form,
    register_type=register_type_form.registration_type.data,register_type_form=register_type_form)

# Route for dashboard after succeful login
@app.route("/portal",methods = ['GET','POST'])
def portal():
    return render_template('portal.html', title='Portal')

# function for sending email
def send_set_reset_email(user):
    token = user.get_set_reset_token()
    msg = Message('Password Set/Reset Request',
                  sender='jnmajanga@gmail.com',
                  recipients=[user.email])
    msg.body = f'''To set/reset your password, visit the following link:
{url_for('set_reset_token', token=token, _external=True)}

If you did not make this request then simply ignore this email and no changes will be made.
'''
    mail.send(msg) 

# Route for verrify registered user by sending activation link to your email
@app.route("/confirm_registration",methods = ['GET','POST'])
def confirm_registration():
    if current_user.is_authenticated:
        return redirect(url_for('portal'))
    form = ConfirmRegistration()
    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()
        send_set_reset_email(user)
        flash('An email has been sent with instructions to set/reset your password.', 'info')
        return redirect(url_for('login'))
    return render_template('confirm_registration.html', title='Confirm Registration', form = form)


# Route to set and reset you password
@app.route("/set_reset_password/<token>", methods=['GET', 'POST'])
def set_reset_token(token):
    if current_user.is_authenticated:
        return redirect(url_for('portal'))
    user = User.verify_set_reset_token(token)
    if user is None:
        flash('That is an invalid or expired token', 'warning')
        return redirect(url_for('confirm_registration'))
    form = SetResetPasswordForm()
    if form.validate_on_submit():
        hashed_password = bcrypt.generate_password_hash(form.password.data).decode('utf-8')
        user.password = hashed_password
        user.active = 'Y'
        db.session.commit()
        flash('Your password has been updated! You are now able to log in', 'success')
        return redirect(url_for('login'))
    return render_template('set_reset_token.html', title='Set Reset Password', form=form)

# Route for to logout

@app.route("/logout")
def logout():
    logout_user()
    return redirect(url_for('login'))

# Route to about page
@app.route("/about")
def about():
     return render_template('about.html', title='About')
