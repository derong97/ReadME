from decouple import config
from pymongo import MongoClient
from datetime import datetime

MONGO_IP = config('MONGO_IP')
MONGO_USER = config('MONGO_USER')
MONGO_PW = config('MONGO_PW')
MONGO_DB = config('MONGO_DB')
MONGO_USERS_COL = config('MONGO_USERS_COL')
MONGO_METADATA_COL = config('MONGO_METADATA_COL')
MONGO_LOG_COL = config('MONGO_LOG_COL')

mongo_client = MongoClient(host=MONGO_IP, username=MONGO_USER, password=MONGO_PW)
mongo_db = mongo_client[MONGO_DB]
mongo_users = mongo_db[MONGO_USERS_COL]
mongo_metadata = mongo_db[MONGO_METADATA_COL]
monog_log = mongo_db[MONGO_LOG_COL]

def mongolog(request_body, **kwargs):
    data = {
        "timestamp": datetime.now(),
        "method": request_body.method
    }
    if len(request_body.args.to_dict()) != 0:
        data["request"] = request_body.args.to_dict()
    for key, val in kwargs.items():
        data[key] = val
    monog_log.insert_one(data)
