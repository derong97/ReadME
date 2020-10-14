# MongoDB
from pymongo import MongoClient

mongo_client = MongoClient('localhost')
mongo_db = mongo_client["readme_mongo"]
mongo_users = mongo_db["users"]
mongo_metadata = mongo_db["kindle_metadata"]