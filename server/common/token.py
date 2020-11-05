from decouple import config
import jwt
from flask import request, jsonify

SECRET_KEY = config("SECRET_KEY")

def token_required(f):
   def decorator(*args, **kwargs):
      token = None

      if 'x-access-tokens' in request.headers:
         token = request.headers['x-access-tokens']

      if not token:
         return jsonify({'message': 'a valid token is missing'})

      try:
         data = jwt.decode(token, SECRET_KEY)
         reviewerID = data['reviewerID']
      except:
         return jsonify({'message': 'token is invalid'})

      return f(reviewerID, *args, **kwargs)
   return decorator