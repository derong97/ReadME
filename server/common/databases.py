import os
from pymongo import MongoClient

# MongoDB
mongo_client = MongoClient(os.getenv('MONGO_HOST'))
mongo_db = mongo_client[os.getenv('MONGO_DB')]
mongo_users = mongo_db[os.getenv('MONGO_USERS')]
mongo_metadata = mongo_db[os.getenv('MONGO_METADATA')]