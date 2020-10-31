from flask import Flask, render_template
from flask_cors import CORS
import os
from apscheduler.schedulers.background import BackgroundScheduler
from controllers.avgRating import AvgRating

# App
app = Flask(__name__,
    static_folder="../frontend/static",
    template_folder="../frontend/static/templates")
CORS(app)

# API Routes
from routers import api_router

# Test Routes (will eventually delete)
@app.route('/')
def index():
    return render_template("index.html", token = "Hello Swee Khim!")

# scheduler = BackgroundScheduler()
# job = scheduler.add_job(AvgRating.get_avg_rating(), 'interval', minutes=10)
# scheduler.start()

if __name__ == '__main__':
    app.run()