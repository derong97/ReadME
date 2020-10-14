from pymongo import MongoClient

MONGO_HOST = "localhost"
#MONGO_HOST = "mongodb+srv://test:1234@cluster0.rjzm7.mongodb.net/test?authSource=admin&replicaSet=atlas-two3e2-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true"
MONGO_DB = "readme_mongo"
METADATA_DB = "kindle_metadata"

client = MongoClient(host=MONGO_HOST)
db = client[MONGO_DB]
collection = db[METADATA_DB]

try:
    user = collection.find_one({})
    print(user)
except Exception as e:
    print(e)

client.close()
