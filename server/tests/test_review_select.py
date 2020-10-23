import MySQLdb as mdb

con = mdb.connect('50.17.91.7', 'root', '', 'readme_sql') # change this to your own hostname, user, password and schema

with con:

    cur = con.cursor()
    cur.execute("SELECT reviewID, reviewTime, summary FROM Kindle LIMIT 5;")

    rows = cur.fetchall()

    for row in rows:
        print(row)
