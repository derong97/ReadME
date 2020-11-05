import requests
import json
from common.mongo import mongo_users

test_user = {
    "name": "Test User",
    "email": "test@gmail.com",
    "password": "secret"
}

invalid_user = {
    "name": "Unregistered Dude",
    "email": "doesnotexist@asdf.com",
    "password": "password"
}

unauthenticated_user = {
    "name": "Test User",
    "email": "test@gmail.com",
    "password": "secrEt"
}

"""
Testing for user signup
"""
signup_url = 'http://localhost:5000/user/signup'

# Test 1 (200 response): User registered successfully
user = requests.post(signup_url, json = test_user)
print(user.text)

# Test 2 (400 response): Email address already in use
user = requests.post(signup_url, json = test_user)
print(user.text)

"""
Testing for user login
"""
login_url = 'http://localhost:5000/user/login'

# Test 3: (200 response) Successfully authenticates the user
result = requests.post(login_url, json = test_user)
print(result.text)

# Test 4: (401 response) Invalid email
result = requests.post(login_url, json = invalid_user)
print(result.text)

# Test 5 (401 response) Wrong password
result = requests.post(login_url, json = unauthenticated_user)
print(result.text)

# Clean Up
result = mongo_users.delete_one({"email": "test@gmail.com"})
print(f"{result.deleted_count} document deleted")