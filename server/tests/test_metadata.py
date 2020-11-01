from pymongo import MongoClient
from common.mongo import mongo_metadata

ASIN = "1603420304"

try:
    book_metadata = mongo_metadata.find_one({"asin": ASIN})
    print(book_metadata)
except Exception as e:
    print(e)