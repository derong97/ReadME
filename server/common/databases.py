from decouple import config

# MongoDB
from pymongo import MongoClient

mongo_client = MongoClient(config('MONGO_HOST'))
mongo_db = mongo_client[config('MONGO_DB')]
mongo_users = mongo_db[config('MONGO_USERS')]
mongo_metadata = mongo_db[config('MONGO_METADATA')]


# MySQL
import MySQLdb as mdb

sql_host = config('SQL_HOST')
sql_user = config('SQL_USER')
sql_pw = config('SQL_PW')
sql_db = config('SQL_DB')
sql_kindle = config('SQL_KINDLE')

# connect to MySQL server
def connect():
    con = mdb.connect(sql_host, sql_user, sql_pw, sql_db)
    cur = con.cursor()
    return con, cur