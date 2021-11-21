from flask import Flask, render_template, url_for, Response
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

app = Flask(__name__)
limiter = Limiter(app, key_func=get_remote_address, default_limits=["200 per minute"])

# Landing page.
@app.route("/")
def index():
    return render_template("index.html")


# Health endpoint.
@app.route("/health")
def health():
    return Response("Ok"), 200


# Post landing page.
@app.route("/portfolio")
def portfolio():
    return render_template("portfolio.html")


# Education page.
@app.route("/education")
def education():
    return render_template("education.html")


# Coursework page.
@app.route("/coursework")
def coursework():
    return render_template("coursework.html")


# Skills page.
@app.route("/skills")
def skills():
    return render_template("skills.html")
