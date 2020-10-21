import MySQLdb as mdb

con = mdb.connect('127.0.0.1', 'root', '', 'dbproj') # change this to your own hostname, user, password and schema

with con:

    cur = con.cursor()
    cur.execute("SELECT reviewID, reviewTime, summary FROM kindle LIMIT 5;")

    rows = cur.fetchall()

    for row in rows:
        print(row)

