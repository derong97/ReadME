from flask import request
from common.mongo import mongo_metadata
import json
from bson import json_util

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