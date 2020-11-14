from flask import Flask, request
from app import app
from controllers.user import User
from controllers.review import Review
from controllers.avgRating import AvgRating
from controllers.metadata import Metadata
from common.token import token_required

####################### USER ROUTES #######################
@app.route('/user/signup', methods=['POST'])
def signup():
    return User().signup()

@app.route('/user/signout', methods=['GET'])
def signout():
    return User().signout()

@app.route('/user/login', methods=['POST'])
def login():
    return User().login()

####################### BOOK ROUTES #######################

@app.route('/book/add', methods=['POST'])
@token_required
def add_new_book(reviewerID):
    return Metadata().add_new_book()
    # TODO: see if can do post logging here instead using reviewerID?

# Ex: /book/B000F83SZQ
@app.route('/book/<asin>', methods=['GET', 'POST', 'PUT', 'DELETE'])
@token_required
def bookAPI(reviewerID, asin):
    if request.method == 'GET':       
        book_metadata = Metadata().get_metadata(asin)

        # TODO: Consider redoing the logging here
        if book_metadata[1] == 200:
            book_reviews = Review().get_reviews(asin)
            message = book_metadata[0]["message"] + " & " + book_metadata[0]["message"]
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

    return Metadata().search(categories, title, pageNum)

#TODO: Remove this. Should be in preprocessing
###################### AVG RATING ROUTES ###################### 
@app.route('/avgRating/getAvgRating', methods=['POST'])
def getAvgRating():
    return AvgRating().get_avg_rating()
