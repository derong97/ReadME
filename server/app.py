from flask import Flask, render_template
from flask_cors import CORS
import os

# App
app = Flask(__name__,
    static_folder="../frontend/static",
    template_folder="../frontend/static/templates")
CORS(app)

# API Routes
from routers import api_router

@app.route('/')
def index():
    return render_template("index.html")

@app.errorhandler(404)
def not_found(e):
    return render_template("index.html")

if __name__ == '__main__':
    app.run()