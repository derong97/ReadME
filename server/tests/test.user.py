import requests
import json

with open("../data/user.json") as json_file:
    data = json.load(json_file)

test_user = data[0]
invalid_user = data[1]
unauthenticated_user = data[2]

"""
Testing for user signup
"""
signup_url = 'http://localhost:5000/user/signup'

# 200 response: User registered successfully
user = requests.post(signup_url, data = test_user)
print(user.text)

# 400 response: Email address already in use
user = requests.post(signup_url, data = test_user)
print(user.text)

"""
Testing for user login
"""
login_url = 'http://localhost:5000/user/login'

# 200 response: Successfully authenticates the user
result = requests.post(login_url, data = test_user)
print(result.text)

# 401 response: Invalid email
result = requests.post(login_url, data = invalid_user)
print(result.text)

# 401 response: Wrong password
result = requests.post(login_url, data = unauthenticated_user)
print(result.text)