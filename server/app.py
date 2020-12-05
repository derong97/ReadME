from flask import Flask, render_template
from flask_cors import CORS

import os
from routers import api_router

# App
app = Flask(__name__,
    static_folder="../frontend/static",
    template_folder="../frontend/static/templates")
CORS(app)


@app.route('/')
def index():
    return render_template("index.html")

# Enables page refresh
@app.errorhandler(404)
def not_found(e):
    return render_template("index.html")

if __name__ == '__main__':
    app.run()