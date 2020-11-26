from common.mongo import mongo_log
from datetime import datetime

"""
Clear the 'log' collection in MongoDB. Equivalently, it's dropping the collection, but I am still keeping it there.
"""

print("Deleting all entries in the collection 'log'.")
mongo_log.drop()
mongo_log.insert_one({"Timestamp": datetime.now(), "Note": "Deletion Occured."})
print("Deletion Completed.")