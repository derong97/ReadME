import requests
from common.mongo import mongo_users, mongo_client

"""
Testing for connection to MongoDB. Independent from Backend.
"""
print("Testing Connection to MongoDB. Printing list of databases. If this takes too long, it suggests problem with connecting.")
dblist = mongo_client.list_database_names()
for db in dblist:
    print(db)
print("Connection to MongoDB Successful.")