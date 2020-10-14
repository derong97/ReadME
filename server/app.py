from flask import Flask

# App
app = Flask(__name__)

# API Routes
from routers import api_router

# Test Routes (will eventually delete)
@app.route('/')
def home():
    return '<h1>Helloo Amigos!</h1>'

if __name__ == '__main__':
    app.run(debug=True)
