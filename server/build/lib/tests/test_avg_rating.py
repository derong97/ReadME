import requests
"""
Testing for average rating
"""
avgRating_url = 'http://localhost:5000/avgRating/getAvgRating'

# Test 1 (200 response): User registered successfully
user = requests.post(avgRating_url)
print(user.text)