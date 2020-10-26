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
            cur.execute(f"SELECT * FROM {SQL_KINDLE} WHERE asin='{asin}';")
            r = fetch_dicts(cur)
            if r == []:
                return {"message":"No reviews found"}, 200

            return {"reviews": r, "message":"Successfully retrieved reviews"}, 200

        except Exception as e:
            return {"message": "Retrieval of reviews failed"}, 400

        finally:
            con.close()
    
    # insert one book review record
    def insert_review(self, asin):
        reviewerID = request.form.get('reviewerID')
        reviewer_info = mongo_users.find_one({"_id": ObjectId(reviewerID)})

        if reviewer_info != None:
            reviewerName = reviewer_info['name']

            overall = request.form.get('overall')
            reviewText = request.form.get('reviewText')
            summary = request.form.get('summary')

            values = f"('{asin}', {overall}, '{reviewText}', curdate(), '{reviewerID}', '{reviewerName}', '{summary}', UNIX_TIMESTAMP())"

            con, cur = connect()
            
            try:
                cur.execute(f"INSERT INTO {SQL_KINDLE} (asin, overall, reviewText, reviewTime, reviewerID, reviewerName, summary, unixReviewTime) VALUES {values}")
                con.commit()
                return {"message": "Successfully inserted review"}, 200
            
            except Exception as e:
                return {"message": "Insertion of review failed"}, 400
            
            finally:
                con.close()

        else:
            return {"message": "Invalid user"}, 401

    #TODO: edit the book review record
    def edit_review(self, asin):
        reviewerID = request.form.get('reviewerID')
        reviewer_info = mongo_users.find_one({"_id": ObjectId(reviewerID)})

        if reviewer_info != None:
            overall = request.form.get('overall')
            reviewText = request.form.get('reviewText')
            summary = request.form.get('summary')

            values = f"overall = {overall}, reviewText = '{reviewText}', reviewTime = curdate(), summary = '{summary}', unixReviewTime = UNIX_TIMESTAMP()"

            con, cur = connect()
            try:
                cur.execute(
                    f"UPDATE {SQL_KINDLE} SET {values} WHERE asin={asin} and reviewerID={reviewerID};")
                con.commit()
                return {"message": "Successfully edited review"}, 200

            except Exception as e:
                return {"message": "Failed to edit review"}, 400

            finally:
                con.close()

        else:
            return {"message": "Invalid user"}, 401

    def delete_review(self, asin):
        reviewerID = request.form.get('reviewerID')
        reviewer_info = mongo_users.find_one({"_id": ObjectId(reviewerID)})
        if reviewer_info != None:
            con, cur = connect()
            try:
                cur.execute(f"DELETE FROM {SQL_KINDLE} WHERE asin={asin} and reviewerID={reviewerID};")
                con.commit()
                return {"message": "Successfully deleted review"}, 200

            except Exception as e:
                return {"message": "Deletion of review failed"}, 400

            finally:
                con.close()
        else:
            return {"message": "Invalid user"}, 401
    
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
                cur.execute(f"SELECT asin, AVG(overall) as 'Average Rating' FROM {SQL_KINDLE} GROUP BY asin ORDER BY AVG(overall) DESC LIMIT 10;")
            else:
                cur.execute(f"SELECT asin, AVG(overall) as 'Average Rating' FROM {SQL_KINDLE} GROUP BY asin ORDER BY AVG(overall) ASC LIMIT 10;")
            
            r = fetch_dicts(cur)
            return {"rating": r, "message": "Successfully sorted books"}, 200

        except Exception as e:
            return {"message": "Sorting of books failed"}, 400
        
        finally:
            con.close()