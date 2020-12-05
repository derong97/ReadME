from flask import request
from common.sql import SQL_KINDLE, connect
from common.mongo import mongo_users
import json
from bson.objectid import ObjectId

def fetch_dicts(cur):
    row_headers = [x[0] for x in cur.description]
    rows = cur.fetchall()
    json_data = []
    
    for result in rows:
        json_data.append(dict(zip(row_headers, result)))
    
    return json_data

class Review:
    
    # get all the reviews of the book
    def get_reviews(self, asin):
        con, cur = connect()

        try:
            cur.execute("SELECT * FROM {} WHERE asin='{}';".format(SQL_KINDLE, asin))
            r = fetch_dicts(cur)
            if r == []:
                return {"message": "No reviews found for asin {}".format(asin)}, 200

            return {"reviews": r, "message": "Successfully retrieved reviews for asin {}".format(asin)}, 200

        except Exception as e:
            return {"message": "Retrieval of reviews failed for asin {}".format(asin)}, 400

        finally:
            con.close()

    # insert one book review record
    def insert_review(self, reviewerID, asin):
        reviewer_info = mongo_users.find_one({"_id": ObjectId(reviewerID)})

        if reviewer_info != None:

            reviewerName = reviewer_info['name']

            overall = request.json.get('overall')
            reviewText = request.json.get('reviewText')
            summary = request.json.get('summary')

            values = "('{}', {}, '{}', curdate(), '{}', '{}', '{}', UNIX_TIMESTAMP())".format(asin, overall, reviewText, reviewerID, reviewerName, summary)

            con, cur = connect()
            
            try:
                cur.execute("INSERT INTO {} (asin, overall, reviewText, reviewTime, reviewerID, reviewerName, summary, unixReviewTime) VALUES {}".format(SQL_KINDLE, values))
                con.commit()
                return {"message": "Successfully added review for asin {}. Refresh the Reviews You Added page to check it out!".format(asin)}, 200
            
            except Exception as e:
                return {"message": "Adding of your review for asin {} failed. Edit your review instead if you have done a review for this book before".format(asin)}, 400
            
            finally:
                con.close()

        else:
            return {"message": "User id {} does not exist".format(reviewerID)}, 401

    def edit_review(self, reviewerID, asin):
        reviewer_info = mongo_users.find_one({"_id": ObjectId(reviewerID)})

        if reviewer_info != None:
            overall = request.json.get('overall')
            reviewText = request.json.get('reviewText')
            summary = request.json.get('summary')

            values = "overall = {}, reviewText = '{}', reviewTime = curdate(), summary = '{}', unixReviewTime = UNIX_TIMESTAMP()".format(overall, reviewText, summary)

            con, cur = connect()
            try:
                cur.execute(
                    "UPDATE {} SET {} WHERE asin='{}' and reviewerID='{}';".format(SQL_KINDLE, values, asin, reviewerID))
                con.commit()
                return {"message": "Successfully edited review for asin {}".format(asin)}, 200

            except Exception as e:
                return {"message": "Failed to edit review for asin {}".format(asin)}, 400

            finally:
                con.close()

        else:
            return {"message": "User id {} does not exist".format(reviewerID)}, 401

    def delete_review(self, reviewerID, asin):
        reviewer_info = mongo_users.find_one({"_id": ObjectId(reviewerID)})

        if reviewer_info != None:
            con, cur = connect()
            try:
                cur.execute("DELETE FROM {} WHERE asin='{}' and reviewerID='{}';".format(SQL_KINDLE, asin, reviewerID))
                con.commit()
                return {"message": "Successfully deleted review for asin {}".format(asin)}, 200

            except Exception as e:
                return {"message": "Deletion of review failed for asin {}".format(asin)}, 400

            finally:
                con.close()
        else:
            return {"message": "User id {} does not exist".format(reviewerID)}, 401
    
    # get average rating of one book
    def get_rating(self, asin):
        con, cur = connect()

        try:
            cur.execute("SELECT AVG(overall) as 'Average Rating' FROM {} WHERE asin = '{}';".format(SQL_KINDLE, asin))
            r = cur.fetchone()[0]
            return {"rating": r, "message": "Successfully retrieved rating for asin {}".format(asin)}, 200

        except Exception as e:
            return {"message": "Retrieval of rating failed for asin {}".format(asin)}, 400
        
        finally:
            con.close()

    # sorts books according to average rating
    def sort_on_ratings(self, desc = True):
        con, cur = connect()
        
        try:
            if(desc):
                cur.execute("SELECT asin, AVG(overall) as 'Average Rating' FROM {} GROUP BY asin ORDER BY AVG(overall) DESC LIMIT 10;".format(SQL_KINDLE))
            else:
                cur.execute("SELECT asin, AVG(overall) as 'Average Rating' FROM {} GROUP BY asin ORDER BY AVG(overall) ASC LIMIT 10;".format(SQL_KINDLE))
            
            r = fetch_dicts(cur)
            return {"rating": r, "message": "Successfully sorted books"}, 200

        except Exception as e:
            return {"message": "Sorting of books failed"}, 400
        
        finally:
            con.close()


    def get_user_reviews(self, reviewerID):
        reviewer_info = mongo_users.find_one({"_id": ObjectId(reviewerID)})

        if reviewer_info != None:
            con, cur = connect()
            try:
                cur.execute("SELECT * FROM {} WHERE reviewerID = '{}';".format(SQL_KINDLE, reviewerID))
                r = fetch_dicts(cur)
                if r == []:
                    return {"message": "No reviews found for user id {}".format(reviewerID)}, 200

                return {"reviews": r, "message": "Successfully retrieved reviews for user id {}".format(reviewerID)}, 200

            except Exception as e:
                return {"message": "Retrieval of reviews failed for user id {}".format(reviewerID)}, 400

            finally:
                con.close()

        else:
            return {"message": "User id {} does not exist".format(reviewerID)}, 401