from flask import render_template, redirect, url_for
from agriconnect import app
from agriconnect.forms import LoginForm
from flask_login import current_user



@app.route("/")
@app.route("/home")
def home():
    return render_template('layout.html', title='Home')


@app.route("/login", methods = ['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('portal'))
    form = LoginForm()
    return render_template('login.html', title='Login', form = form)

@app.route("/portal")
def portal():
    return render_template('portal.html', title='Portal')
