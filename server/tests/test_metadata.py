from pymongo import MongoClient
from common.mongo import mongo_metadata

try:
    user = mongo_metadata.find_one({})
    print(user)
except Exception as e:
    print(e)