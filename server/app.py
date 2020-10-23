from flask import Flask, render_template
import os

# App
app = Flask(__name__,
    static_folder="../frontend/static",
    template_folder="../frontend/static/templates")

# API Routes
from routers import api_router

# Test Routes (will eventually delete)
@app.route('/')
def index():
    return render_template("index.html", token = "Hello Swee Khim!")

if __name__ == '__main__':
    app.run()