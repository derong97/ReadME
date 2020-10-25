from decouple import config
from pymongo import MongoClient

MONGO_IP = config('MONGO_IP')
MONGO_HOST = config('MONGO_HOST')
MONGO_DB = config('MONGO_DB')
MONGO_USERS = config('MONGO_USERS')
MONGO_PW = config('MONGO_PW')
MONGO_METADATA = config('MONGO_METADATA')

mongo_client = MongoClient(host=MONGO_IP, username=MONGO_USERS, password=MONGO_PW)
mongo_db = mongo_client[MONGO_DB]
mongo_users = mongo_db[MONGO_USERS]
mongo_metadata = mongo_db[MONGO_METADATA]