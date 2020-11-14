from flask import Flask, request
from app import app
from controllers.user import User
from controllers.review import Review
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
def add_new_book():
    return Metadata().add_new_book()

# Ex: /book/B000F83SZQ
@app.route('/book/<asin>', methods=['GET', 'POST', 'PUT', 'DELETE'])
@token_required
def bookAPI(reviewerID, asin):
    if request.method == 'GET':       
        book_metadata = Metadata().get_metadata(asin)

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

# Ex: /reviews/user/A1F6404F1VG29J
@app.route('/reviews/user/<reviewerID>', methods=['GET'])
def get_user_reviews(reviewerID):
    return Review().get_user_reviews(reviewerID)

# Ex 1: /books?categories=Catholicism
# Ex 2: /books?title=flowers&pageNum=2
# Ex 3: /books?categories=Preventive Medicine&title=public health
@app.route('/books', methods=['GET'])
def search():
    categories = request.args.get('categories', default=None, type=str)
    title = request.args.get('title', default=None, type=str)
    pageNum = request.args.get('pageNum', default=1, type=int)

    return Metadata().search(categories, title, pageNum)