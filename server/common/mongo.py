from decouple import config
from pymongo import MongoClient

MONGO_IP = config('MONGO_IP')
MONGO_USER = config('MONGO_USER')
MONGO_PW = config('MONGO_PW')
MONGO_DB = config('MONGO_DB')
MONGO_USERS_COL = config('MONGO_USERS_COL')
MONGO_METADATA_COL = config('MONGO_METADATA_COL')

mongo_client = MongoClient(host=MONGO_IP, username=MONGO_USER, password=MONGO_PW)
mongo_db = mongo_client[MONGO_DB]
mongo_users = mongo_db[MONGO_USERS_COL]
mongo_metadata = mongo_db[MONGO_METADATA_COL]