from decouple import config
import MySQLdb as mdb

SQL_IP = config('SQL_IP')
SQL_USER = config('SQL_USER')
SQL_PW = config('SQL_PW')
SQL_DB = config('SQL_DB')
SQL_KINDLE = config('SQL_KINDLE')

def connect():
    con = mdb.connect(SQL_IP, SQL_USER, SQL_PW, SQL_DB)
    cur = con.cursor()
    return con, cur