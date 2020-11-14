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
                return {"message": f"No metadata found for asin {asin}"}, 200

            book_metadata = json.loads(json_util.dumps(book_metadata))
            return {"metadata": book_metadata, "message": f"Successfully retrieved metadata for asin {asin}"}, 200

        except Exception as e:
            return {"message": f"Retrieval of metadata failed for asin {asin}"}, 400

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
            return {"message": f"asin not provided"}, 400
        
         # Check for existing asin
        elif mongo_metadata.find_one({"asin" : book_metadata['asin']}):
            return {"message": f"asin {book_metadata['asin']} already taken up"}, 400

        # Insert book metadata record into db
        elif mongo_metadata.insert_one(book_metadata):
            return {"message": f"Successfully inserted book for asin {book_metadata['asin']}"}, 200

        return {"message": "Failed to add new book"}, 400

    # search corresponding metadata with title matching provided title substring
    def search_by_title(self, title, pageNum=1):
        try:
            # same as searching on Compass: {title: /<title/i}
            pat = re.compile(title, re.I)
            matching_counts = mongo_metadata.find({"title": {'$regex': pat}}).count()

            if matching_counts == 0:
                return {"message": f"No metadata found with title containing {title}"}, 200
            
            max_counts_till_prev_page = (pageNum - 1) * MAX_BOOKS_PER_PAGE
            max_counts_till_curr_page = pageNum * MAX_BOOKS_PER_PAGE

            isLastPage = matching_counts > max_counts_till_prev_page and matching_counts <= max_counts_till_curr_page

            list_of_metadata = mongo_metadata.find({"title": {'$regex': pat}})

            if isLastPage:
                list_of_metadata = list_of_metadata[max_counts_till_prev_page : ]
            else:
                list_of_metadata = list_of_metadata[max_counts_till_prev_page : max_counts_till_curr_page]

            list_of_metadata = json.loads(json_util.dumps(list_of_metadata))

            return {"metadata": list_of_metadata, # returns max 10 records only
                    "total counts": matching_counts, # so the frontend knows how many pages to expect
                    "message": f"Successfully retrieved metadata with title containing {title}" 
                    }, 200

        except Exception as e:
            return {"message": f"Retrieval of metadata failed when searching for title containing {title}"}, 400
        
        return {{"message": f"Failed to search by title"}}, 400
    
    def sort_by_avg_rating(self, averageRating):
        return