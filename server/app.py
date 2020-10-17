from flask import Flask

# App
app = Flask(__name__)

# API Routes
from routers import api_router

# Test Routes (will eventually delete)
@app.route('/')
def home():
    return Flask.render_template("index.html",token = "hi Swee Khim")

if __name__ == '__main__':
    app.run(debug=True)
