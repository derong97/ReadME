from decouple import config
from pymongo import MongoClient

MONGO_HOST = config('MONGO_HOST')
MONGO_DB = config('MONGO_DB')
MONGO_USERS = config('MONGO_USERS')
MONGO_METADATA = config('MONGO_METADATA')

mongo_client = MongoClient(host=MONGO_HOST)
mongo_db = mongo_client[MONGO_DB]
mongo_users = mongo_db[MONGO_USERS]
mongo_metadata = mongo_db[MONGO_METADATA]