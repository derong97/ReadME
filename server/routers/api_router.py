from flask import Flask, request
from app import app
from controllers.user import User
from controllers.review import Review

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

###################### REVIEW ROUTES ######################
# Ex: /review/B000F83SZQ
@app.route('/review/<asin>', methods=['GET', 'POST', 'PUT', 'DELETE'])
def reviewAPI(asin):
    if request.method == 'GET':
        return Review().get_reviews(asin)

    elif request.method == 'POST':
        return Review().insert_review(asin)
    
    elif request.method == 'PUT': # not done
        return Review().edit_reviews(asin)
    
    elif request.method == 'DELETE': # not done
        return Review().delete_review(asin)

# Ex: /reviews?desc=True
@app.route('/reviews', methods=['GET'])
def reviewsAPI():
    desc = request.args.get('desc', default = True, type = bool)
    # genre = request.args.get('genre', default = None, type = str) # TODO: sort by genre in the same function?

    return Review().sort_on_ratings(desc) # TODO: (error) Object of type 'Decimal' is not JSON serializable