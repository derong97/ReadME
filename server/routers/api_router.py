from flask import Flask, request
from app import app
from controllers.user import User
from controllers.review import Review
from controllers.metadata import Metadata
from common.token import token_required
from common.mongo import mongolog
from decouple import config

####################### USER ROUTES #######################
@app.route('/user/signup', methods=['POST'])
def signup():
    json_response, res_code = User().signup()
    mongolog(request, action='signup', json_response=json_response, response_code=res_code)
    return json_response, res_code

@app.route('/user/signout', methods=['GET'])
def signout():
    mongolog(request, action='signout', response_code=400)
    return User().signout()

@app.route('/user/login', methods=['POST'])
def login():
    json_response, res_code = User().login()
    mongolog(request, action='login', json_response=json_response, response_code=res_code)
    return json_response, res_code

####################### BOOK ROUTES #######################
@app.route('/book/add', methods=['POST'])
@token_required
def add_new_book(reviewerID):
    json_response, res_code = Metadata().add_new_book()
    mongolog(request, reviewerID=reviewerID, action="add_new_book", json_response=json_response, response_code=res_code)
    return json_response, res_code

# Ex: /book/B000F83SZQ
@app.route('/book/<asin>', methods=['GET', 'POST', 'PUT', 'DELETE'])
@token_required
def bookAPI(reviewerID, asin):

    if request.method == 'GET':
    # Query from MongoDB       
        book_metadata = Metadata().get_metadata(asin)

        if book_metadata[1] == 200:
            book_reviews = Review().get_reviews(asin)
            message = book_metadata[0]["message"] + " & " + book_reviews[0]["message"]
            combined_response = {**book_metadata[0], **book_reviews[0], **{"message": message}} # later keys will override
            json_response, res_code = combined_response, book_reviews[1]
        else:
            json_response, res_code = book_metadata
        mongolog(request, reviewerID=reviewerID, asin=asin, action="get_reviews_and_metadata", response_code=res_code)
        return json_response, res_code

    elif request.method == 'POST':
        json_response, res_code = Review().insert_review(reviewerID, asin)
        mongolog(request, reviewerID=reviewerID, asin=asin, action="insert_review", json_response=json_response, response_code=res_code)
        return json_response, res_code
    
    elif request.method == 'PUT':
        json_response, res_code = Review().edit_review(reviewerID, asin)
        mongolog(request, reviewerID=reviewerID, asin=asin, action="edit_review", json_response=json_response, response_code=res_code)
        return json_response, res_code

    elif request.method == 'DELETE':
        json_response, res_code = Review().delete_review(reviewerID, asin)
        mongolog(request, reviewerID=reviewerID, asin=asin, action="delete_review", json_response=json_response, response_code=res_code)
        return json_response, res_code

# Ex: /reviews/user
@app.route('/reviews/user', methods=['GET'])
@token_required
def get_user_reviews(reviewerID):
    json_response, res_code = Review().get_user_reviews(reviewerID)
    mongolog(request, reviewerID=reviewerID, action="get_user_reviews", response_code=res_code)
    return json_response, res_code

# Ex 1: /books?category=Public Health&category=Vascular
# Ex 2: /books?title=flowers&pageNum=2
# Ex 3: /books?category=Preventive Medicine&title=public health
@app.route('/books', methods=['GET'])
@token_required
def search(reviewerID):
    categories = request.args.getlist("category")
    title = request.args.get('title', default=None, type=str)
    pageNum = request.args.get('pageNum', default=1, type=int)
    json_response, res_code = Metadata().search(categories, title, pageNum)
    mongolog(request, reviewerID=reviewerID, action="metadata_search", response_code=res_code)
    return json_response, res_code 