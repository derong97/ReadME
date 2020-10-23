import MySQLdb as mdb

con = mdb.connect('50.17.91.7', 'root', '', 'readme_sql') # change this to your own hostname, user, password and schema

with con:

    cur = con.cursor()
    cur.execute("INSERT INTO Kindle (asin, overall, reviewText, reviewTime, reviewerID, reviewerName, summary, unixReviewTime) VALUES ('test_asin', 5, 'test_reviewText', curdate(), 'test_reviewerID', 'test_reviewerName', 'test_summary', UNIX_TIMESTAMP());")
    con.commit() # need this line to write data to table

    cur.execute("SELECT * FROM Kindle WHERE asin='test_asin';")

    rows = cur.fetchall()

    for row in rows:
        print(row)