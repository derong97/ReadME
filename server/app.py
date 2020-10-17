from flask import Flask, render_template

# App
app = Flask(__name__)

# API Routes
# from routers import api_router

# Test Routes (will eventually delete)
@app.route('/')
def index():
    return render_template("index.html", token = "Hello Swee Khim!")

if __name__ == '__main__':
    app.run(debug=True)
