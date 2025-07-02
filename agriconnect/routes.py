# Import necessary libraries
from flask import render_template, redirect, url_for, request, flash
from agriconnect import app, bcrypt, db, mail
from agriconnect.forms import (LoginForm, ConfirmRegistration, RegistrationForm, 
SetResetPasswordForm, RegisterTypeForm,RegisterFarmerForm, RegisterSupplierForm)
from agriconnect.models import User, Farmer,Supplier
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

    register_type_form = RegisterTypeForm()
    register_type = request.args.get('register_type')

    

    # Step 1: Handle registration type selection form
    if register_type_form.validate_on_submit() and register_type_form.submit.data:
        selected_type = register_type_form.registration_type.data
        return redirect(url_for('register', register_type=selected_type))

    # Step 2: Show registration form based on selected type (e.g., admin)
    form = RegistrationForm()

    if form.validate_on_submit() and form.submit.data:
        hashed_password = bcrypt.generate_password_hash(form.password.data).decode('utf-8')
        user = User(username=form.username.data, email=form.email.data, password=hashed_password)
        db.session.add(user)
        db.session.commit()
        flash('Your account has been created! You are now able to log in', 'success')
        return redirect(url_for('login'))
    
    # Step 3: Show registration form based on selected type (e.g., farmer)
    farmer_form = RegisterFarmerForm()

    if farmer_form.validate_on_submit() and farmer_form.submit.data:
        # hashed_password = bcrypt.generate_password_hash(form.password.data).decode('utf-8')
        farmer = Farmer(name=farmer_form.username.data, email=farmer_form.email.data,contact=farmer_form.contact.data,
                      county=farmer_form.county.data,country=farmer_form.country.data,location=farmer_form.county.data+","+farmer_form.country.data,
                      land_size=farmer_form.land_size.data, soil_composition=farmer_form.soil_composition.data)
        db.session.add(farmer)
        db.session.commit()
        flash(f'Farmer {form.username.data} has been successfully registered! You are now able to log in', 'success')
        return redirect(url_for('login'))
    
    # Step 4: Show registration form based on selected type (e.g., Supplier)
    supplier_form = RegisterSupplierForm()

    if supplier_form.validate_on_submit() and supplier_form.submit.data:
        # hashed_password = bcrypt.generate_password_hash(form.password.data).decode('utf-8')
        supplier = Supplier(company=supplier_form.company.data, email=supplier_form.email.data,contact=supplier_form.contact.data,
                      county=supplier_form.county.data,country=supplier_form.country.data,location=supplier_form.county.data+","+supplier_form.country.data,
                      services=supplier_form.services.data)
        db.session.add(supplier)
        db.session.commit()
        flash(f'Supplier {supplier_form.company.data} has been successfully registered! You are now able to log in', 'success')
        return redirect(url_for('login'))
    

    if register_type:
        register_type_form.registration_type.data = register_type
        
    return render_template('register.html', title='Register',
                           form=form,
                           register_type_form=register_type_form,
                           register_type=register_type,
                           farmer_form = farmer_form,
                           supplier_form = supplier_form)


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
