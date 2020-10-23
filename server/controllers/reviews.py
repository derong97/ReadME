from common.databases import connect
from common.databases import SQL_KINDLE

def fetch_dicts(cur):
    row_headers = [x[0] for x in cur.description]
    rows = cur.fetchall()
    json_data = []
    for result in rows:
        json_data.append(dict(zip(row_headers, result)))
    return json_data

class Reviews:
    # get reviews of one book
    def get_reviews(self, asin):
        con, cur = connect()
        try:
            cur.execute("SELECT * FROM {} WHERE asin='{}';".format(SQL_KINDLE, asin))
            r = fetch_dicts(cur)
            return {"reviews":r, "message":"Successfully retrieved reviews"}, 200

        except Exception as e:
            return {"message": "Retrieval of reviews failed"}, 400
        finally:
            con.close()

    # get average rating of one book
    def get_rating(self, asin):
        con, cur = connect()
        try:
            cur.execute("SELECT AVG(overall) as 'Average Rating' FROM {} WHERE asin = '{}';".format(SQL_KINDLE, asin))
            r = cur.fetchone()[0]
            print(r)
            return {"rating": r, "message": "Successfully retrieved rating"}, 200

        except Exception as e:
            return {"message": "Retrieval of rating failed"}, 400
        finally:
            con.close()

    # sorts books according to average rating
    def sort_on_ratings(self, desc = True):
        con, cur = connect()
        try:
            if(desc):
                cur.execute("SELECT asin, AVG(overall) as 'Average Rating' FROM {} GROUP BY asin ORDER BY AVG(overall) DESC;".format(SQL_KINDLE))
            else:
                cur.execute("SELECT asin, AVG(overall) as 'Average Rating' FROM {} GROUP BY asin ORDER BY AVG(overall) ASC;".format(SQL_KINDLE))
            r = fetch_dicts(cur)
            return {"rating": r, "message": "Successfully sorted books"}, 200

        except Exception as e:
            return {"message": "Sorting of books failed"}, 400
        finally:
            con.close()



r1 = Reviews().get_reviews('B00HZD515Y')
print(r1)





