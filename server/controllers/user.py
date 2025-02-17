import json
from bson.json_util import dumps
from flask import Flask, jsonify, request, redirect
from passlib.hash import pbkdf2_sha256
from common.mongo import mongo_users
from common.token import SECRET_KEY
import datetime
import jwt

class User:

    def signup(self):
        # Create the user object with the json data
        user = {
            "name": request.json.get('name'),
            "email": request.json.get('email'),
            "password": request.json.get('password')
        }

        # Encrypt the password
        user['password'] = pbkdf2_sha256.encrypt(user['password'])

        # Check for existing email address
        if mongo_users.find_one({"email" : user['email']}):
            return {"message": "Email address '{}' already in use".format(user['email'])}, 400

        # Insert user record into db
        elif mongo_users.insert_one(user):
            # token expires after 30 min
            token = jwt.encode({"reviewerID": str(user['_id']), 'exp' : datetime.datetime.utcnow() + datetime.timedelta(minutes=30)}, SECRET_KEY)
            return {"token": token.decode('UTF-8'), "message" : "{} successfully signed up".format(user['name']), "username": user['name'], "reviewerID": str(user['_id'])  }, 200

        return {"message": "Signup failed"}, 400

    def signout(self):
        return redirect('/')

    def login(self):
        user = mongo_users.find_one({
            "email": request.json.get("email")
        })

        # Checks if the user exists and whether the hashed unencrypted password matches the stored encrypted password
        if user and pbkdf2_sha256.verify(request.json.get('password'), user['password']):
            # token expires after 30 min
            token = jwt.encode({"reviewerID": str(user['_id']), 'exp' : datetime.datetime.utcnow() + datetime.timedelta(minutes=30)}, SECRET_KEY)
            return {"token": token.decode('UTF-8'), "message" : "{} successfully logged in".format(user['name']), "username": user['name'], "reviewerID": str(user['_id']) }, 200
        
        return {"message": "Invalid login credentials"}, 401