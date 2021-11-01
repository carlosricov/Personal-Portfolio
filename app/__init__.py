from flask import Flask, render_template, url_for, Response

app = Flask(__name__)

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
