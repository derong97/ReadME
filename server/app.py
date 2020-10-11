from flask import Flask
from pymongo import MongoClient

# App
app = Flask(__name__)

# MongoDB (move logic to a common folder to reduce unnecessary circular dependencies)
mongo_client = MongoClient('localhost')
mongo_db = mongo_client["readme_mongo"]

# API Routes
from routers import api_router

# Test Routes (will eventually delete)
@app.route('/')
def home():
    return '<h1>Helloo Amigos!</h1>'

if __name__ == '__main__':
    app.run(debug=True)
