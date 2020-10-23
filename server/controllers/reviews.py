from common.databases import connect
from flask import request
from common.databases import sql_kindle
from common.databases import mongo_users

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
            cur.execute("SELECT * FROM {} WHERE asin='{}';".format(sql_kindle, asin))
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
            cur.execute("SELECT AVG(overall) as 'Average Rating' FROM {} WHERE asin = '{}';".format(sql_kindle, asin))
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
                cur.execute("SELECT asin, AVG(overall) as 'Average Rating' FROM {} GROUP BY asin ORDER BY AVG(overall) DESC;".format(sql_kindle))
            else:
                cur.execute("SELECT asin, AVG(overall) as 'Average Rating' FROM {} GROUP BY asin ORDER BY AVG(overall) ASC;".format(sql_kindle))
            r = fetch_dicts(cur)
            return {"rating": r, "message": "Successfully sorted books"}, 200

        except Exception as e:
            return {"message": "Sorting of books failed"}, 400
        finally:
            con.close()

    def insert_review(self, asin, reviewerID):
        if mongo_users.find_one({"_id":reviewerID}):

            reviewerName = mongo_users.find({"_id":reviewerID})["name"]

            overall = request.form.get('overall')
            reviewText = request.form.get('reviewText')
            summary = request.form.get('summary')

            values = "('{}', {}, '{}', curdate(), '{}', '{}', '{}', UNIX_TIMESTAMP())".format(asin, overall, reviewText, reviewerID, reviewerName, summary)

            con, cur = connect()
            try:
                cur.execute("INSERT INTO {} (asin, overall, reviewText, reviewTime, reviewerID, reviewerName, summary, unixReviewTime) VALUES {}".format(sql_kindle, values))
                con.commit()
                return {"message": "Successfully inserted review"}, 200
            except Exception as e:
                return {"message": "Insertion of review failed"}, 400
            finally:
                con.close()

        else:
            return {"message": "Invalid user"}, 401











