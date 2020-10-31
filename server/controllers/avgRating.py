from flask import request
from common.sql import SQL_KINDLE, connect
from common.mongo import mongo_metadata

class AvgRating:

    # get average rating of all books
    def get_avg_rating(self):
        con, cur = connect()

        for doc in mongo_metadata.find():
            print(doc)
            asin = doc['asin']
            print(asin)

            try:
                cur.execute("SELECT AVG(overall) as 'Average Rating' FROM {} WHERE asin = '{}';".format(SQL_KINDLE, asin))
                r = cur.fetchone()[0]
                if r is None:
                    r = 0
                else:
                    r = round(r)

            except Exception as e:
                print(e)
            
            avg_rating = { "$set": {"averageRating" : r} }
            print(avg_rating)
            mongo_metadata.update_one(doc, avg_rating)

            print(mongo_metadata.find({'asin' : asin}))
        
        con.close()
        return "Success"
            