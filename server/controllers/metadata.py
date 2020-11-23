from flask import request
from common.mongo import mongo_metadata
import re
import json
from bson import json_util

MAX_BOOKS_PER_PAGE = 10

class Metadata:

    # get metadata of the book
    def get_metadata(self, asin):
        try:
            book_metadata = mongo_metadata.find_one({"asin": asin})

            if book_metadata == None:
                return {"message": "No metadata found for asin {}".format(asin)}, 200

            book_metadata = json.loads(json_util.dumps(book_metadata))
            return {"metadata": book_metadata, "message": "Successfully retrieved metadata for asin {}".format(asin)}, 200

        except Exception as e:
            return {"message": "Retrieval of metadata failed for asin {}".format(asin)}, 400

    def add_new_book(self):
        book_metadata = {
            "asin": request.json.get('asin'),
            "title": request.json.get('title'),
            "description": request.json.get('description'),
            "price": request.json.get('price'),
            "imUrl": request.json.get('imUrl'),
            "categories": request.json.get('categories')
        }

        book_metadata = {k: v for k, v in book_metadata.items() if v is not None}

        # Check if asin field is supplied; this field should be made compulsory on frontend
        if book_metadata["asin"] == None: 
            return {"message": "asin not provided"}, 400
        
         # Check for existing asin
        elif mongo_metadata.find_one({"asin" : book_metadata['asin']}):
            return {"message": "asin {} already taken up".format(book_metadata['asin'])}, 400

        # Insert book metadata record into db
        elif mongo_metadata.insert_one(book_metadata):
            return {"message": "Successfully inserted book for asin {}".format(book_metadata['asin'])}, 200

        return {"message": "Failed to add new book"}, 400

    # search by title and filter by categories if supplied
    def search(self, categories, title, pageNum):
        try:
            filter_dict = {}

            if categories != []:
                filter_dict.update({"categories": {"$elemMatch": {"$elemMatch": {"$in": categories}}}})

            if title != None:
                # same as searching on Compass: {title: /<title/i}
                pattern = re.compile(title, re.I) # not case sensitive
                filter_dict.update({"title": {'$regex': pattern}})
            
            # all_metadata = self.sort_by_avg_rating(filter_dict) # TODO: not all records have average rating now
            all_metadata = mongo_metadata.find(filter_dict)

            if all_metadata.count() == 0:
                return {"message": "No metadata found with title as {} and categories as {categories}".format(title, categories)}, 200
            
            return {"metadata": self.get_page_metadata(all_metadata, pageNum), # returns max 10 records only
                    "total counts": all_metadata.count(), # so the frontend knows how many pages to expect
                    "message": "Successfully retrieved metadata with title as {title} and categories as {categories}"
                    }, 200

        except Exception as e:
            return {"message": "Retrieval of metadata failed when searching"}, 400
        
        return {"message": "Retrieval of metadata failed when searching"}, 400
    
    # returns only the relevant page metadata
    def get_page_metadata(self, all_metadata, pageNum=1):
        max_counts_till_prev_page = (pageNum - 1) * MAX_BOOKS_PER_PAGE
        max_counts_till_curr_page = pageNum * MAX_BOOKS_PER_PAGE

        isLastPage = all_metadata.count() > max_counts_till_prev_page and all_metadata.count() <= max_counts_till_curr_page

        if isLastPage:
            page_metadata = all_metadata[max_counts_till_prev_page : ]
        else:
            page_metadata = all_metadata[max_counts_till_prev_page : max_counts_till_curr_page]

        return json.loads(json_util.dumps(page_metadata))

    # filtered result is sorted by averageRating in descending order
    def sort_by_avg_rating(self, filter_dict={}):
        return mongo_metadata.find(filter_dict).sort( {"averageRating": -1})