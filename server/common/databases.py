# MongoDB
from pymongo import MongoClient

mongo_client = MongoClient('localhost')
mongo_db = mongo_client["readme_mongo"]
mongo_users = mongo_db["users"]
mongo_metadata = mongo_db["kindle_metadata"]

# MySQL
import MySQLdb as mdb

SQL_HOST='50.17.91.7'
SQL_USER='root'
SQL_PW=''
SQL_DB='readme_sql'
SQL_KINDLE='Kindle'

# connect to MySQL server
def connect():
    con = mdb.connect(SQL_HOST, SQL_USER, SQL_PW, SQL_DB)
    cur = con.cursor()
    return con, cur