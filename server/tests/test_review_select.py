from common.sql import connect

con, cur = connect()

with con:
    cur.execute("SELECT reviewID, reviewTime, summary FROM Kindle LIMIT 5;")

    rows = cur.fetchall()

    for row in rows:
        print(row)