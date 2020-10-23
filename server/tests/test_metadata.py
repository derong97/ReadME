from pymongo import MongoClient
#from common.databases import mongo_metadata
#TODO: not sure why I cannot import common module?

# HOST = "mongodb://admin:password@3.86.84.1/readme_mongo"

client = MongoClient(host="localhost")
db = client["readme_mongo"]
collection = db["kindle_metadata"]

try:
    user = collection.find_one({})
    print(user)
except Exception as e:
    print(e)