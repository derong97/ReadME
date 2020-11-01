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
                return {"message": f"No reviews found for asin {asin}"}, 200

            return {"reviews": r, "message": f"Successfully retrieved reviews for asin {asin}"}, 200

        except Exception as e:
            return {"message": f"Retrieval of reviews failed for asin {asin}"}, 400

        finally:
            con.close()
    
    # insert one book review record
    def insert_review(self, asin):
        reviewerID = request.json.get('reviewerID')
        reviewer_info = mongo_users.find_one({"_id": ObjectId(reviewerID)})

        if reviewer_info != None:
            reviewerName = reviewer_info['name']

            overall = request.json.get('overall')
            reviewText = request.json.get('reviewText')
            summary = request.json.get('summary')

            values = f"('{asin}', {overall}, '{reviewText}', curdate(), '{reviewerID}', '{reviewerName}', '{summary}', UNIX_TIMESTAMP())"

            con, cur = connect()
            
            try:
                cur.execute(f"INSERT INTO {SQL_KINDLE} (asin, overall, reviewText, reviewTime, reviewerID, reviewerName, summary, unixReviewTime) VALUES {values}")
                con.commit()
                return {"message": f"Successfully inserted review for asin {asin}"}, 200
            
            except Exception as e:
                return {"message": f"Insertion of review failed for asin {asin}"}, 400
            
            finally:
                con.close()

        else:
            return {"message": f"User id {reviewerID} does not exist"}, 401

    def edit_review(self, asin):
        reviewerID = request.json.get('reviewerID')
        reviewer_info = mongo_users.find_one({"_id": ObjectId(reviewerID)})

        if reviewer_info != None:
            overall = request.json.get('overall')
            reviewText = request.json.get('reviewText')
            summary = request.json.get('summary')

            values = f"overall = {overall}, reviewText = '{reviewText}', reviewTime = curdate(), summary = '{summary}', unixReviewTime = UNIX_TIMESTAMP()"

            con, cur = connect()
            try:
                cur.execute(
                    f"UPDATE {SQL_KINDLE} SET {values} WHERE asin={asin} and reviewerID={reviewerID};")
                con.commit()
                return {"message": f"Successfully edited review for asin {asin}"}, 200

            except Exception as e:
                return {"message": f"Failed to edit review for asin {asin}"}, 400

            finally:
                con.close()

        else:
            return {"message": f"User id {reviewerID} does not exist"}, 401

    def delete_review(self, asin):
        reviewerID = request.json.get('reviewerID')
        reviewer_info = mongo_users.find_one({"_id": ObjectId(reviewerID)})
        if reviewer_info != None:
            con, cur = connect()
            try:
                cur.execute(f"DELETE FROM {SQL_KINDLE} WHERE asin={asin} and reviewerID={reviewerID};")
                con.commit()
                return {"message": f"Successfully deleted review for asin {asin}"}, 200

            except Exception as e:
                return {"message": f"Deletion of review failed for asin {asin}"}, 400

            finally:
                con.close()
        else:
            return {"message": f"User id {reviewerID} does not exist"}, 401
    
    # get average rating of one book
    def get_rating(self, asin):
        con, cur = connect()

        try:
            cur.execute(f"SELECT AVG(overall) as 'Average Rating' FROM {SQL_KINDLE} WHERE asin = '{asin}';")
            r = cur.fetchone()[0]
            return {"rating": r, "message": f"Successfully retrieved rating for asin {asin}"}, 200

        except Exception as e:
            return {"message": f"Retrieval of rating failed for asin {asin}"}, 400
        
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


    def get_user_reviews(self, reviewerID):
        reviewer_info = mongo_users.find_one({"_id": ObjectId(reviewerID)})

        if reviewer_info != None:
            con, cur = connect()
            try:
                cur.execute(f"SELECT * FROM {SQL_KINDLE} WHERE reviewerID = '{reviewerID}';")
                r = fetch_dicts(cur)
                if r == []:
                    return {"message": f"No reviews found for user id {reviewerID}"}, 200

                return {"reviews": r, "message": f"Successfully retrieved reviews for user id {reviewerID}"}, 200

            except Exception as e:
                return {"message": f"Retrieval of reviews failed for user id {reviewerID}"}, 400

            finally:
                con.close()

        else:
            return {"message": f"User id {reviewerID} does not exist"}, 401