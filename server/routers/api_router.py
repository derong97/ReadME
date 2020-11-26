from flask import Flask, request
from app import app
from controllers.user import User
from controllers.review import Review
from controllers.metadata import Metadata
from common.token import token_required
from common.mongo import MONGO_IP, MONGO_USER, MONGO_PW, MONGO_DB, MONGO_LOG_COL, mongolog
from decouple import config

import logging
import logging.handlers
from log4mongo.handlers import MongoHandler

#######################   LOGGING-   #######################
mhandler = MongoHandler(
    host=f'mongodb://{MONGO_USER}:{MONGO_PW}@204.236.223.217:27017',
    port=27017,
    database_name="readme_mongo", 
    collection="log",
)
logging.getLogger('werkzeug').setLevel(logging.DEBUG)
logging.getLogger('werkzeug').addHandler(mhandler)

####################### USER ROUTES #######################
@app.route('/user/signup', methods=['POST'])
def signup():
    mongolog(request, action='signup')
    return User().signup()

@app.route('/user/signout', methods=['GET'])
def signout():
    mongolog(request, action='signout')
    return User().signout()

@app.route('/user/login', methods=['POST'])
def login():
    mongolog(request, action='login')
    return User().login()

####################### BOOK ROUTES #######################

@app.route('/book/add', methods=['POST'])
@token_required
def add_new_book(reviewerID):
    # app.logger.info('Testing logging request')
    mongolog(request, reviewerID=reviewerID, action="add_new_book")
    return Metadata().add_new_book()

# Ex: /book/B000F83SZQ
@app.route('/book/<asin>', methods=['GET', 'POST', 'PUT', 'DELETE'])
@token_required
def bookAPI(reviewerID, asin):
    mongolog(request, reviewerID=reviewerID, asin=asin, action="bookAPI")

    if request.method == 'GET':
        # Query from MongoDB       
        book_metadata = Metadata().get_metadata(asin)

        # TODO: Consider redoing the logging here
        if book_metadata[1] == 200:
            book_reviews = Review().get_reviews(asin)
            message = book_metadata[0]["message"] + " & " + book_reviews[0]["message"]
            combined_response = {**book_metadata[0], **book_reviews[0], **{"message": message}} # later keys will override

            return combined_response, book_reviews[1]
        else:
            return book_metadata

    elif request.method == 'POST':
        return Review().insert_review(reviewerID, asin)
    
    elif request.method == 'PUT':
        return Review().edit_review(reviewerID, asin)
    
    elif request.method == 'DELETE':
        return Review().delete_review(reviewerID, asin)

# Ex: /reviews/user
@app.route('/reviews/user', methods=['GET'])
@token_required
def get_user_reviews(reviewerID):
    mongolog(request, reviewerID=reviewerID, action="get_user_reviews")
    return Review().get_user_reviews(reviewerID)

# Ex 1: /books?category=Public Health&category=Vascular
# Ex 2: /books?title=flowers&pageNum=2
# Ex 3: /books?category=Preventive Medicine&title=public health
@app.route('/books', methods=['GET'])
@token_required
def search(reviewerID):
    categories = request.args.getlist("category")
    title = request.args.get('title', default=None, type=str)
    pageNum = request.args.get('pageNum', default=1, type=int)

    mongolog(request, reviewerID=reviewerID, action="search")
    return Metadata().search(categories, title, pageNum)