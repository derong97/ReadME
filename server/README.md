# Local Development

## Prerequisites

1. Create an isolated python environment: `python3 -m venv venv`
2. Activate your virtual environment: `source venv/bin/activate`
3. Install all packages: `pip install -r requirements.txt`
4. Start the Server: `./run` or `python3 app.py`
5. Set up MongoDB. Refer to `automation/mongo/mongo_script.sh` (documentation not complete)
   - The `kindle_metadata` collection contains all the books' metadata
   - The `users` collection contains all the registered users

## Tests

In the `/tests` folder, you can run tests to ensure that your endpoints are working as expected.

1. `python3 test.user.py` will simulate user signup and login on the website through a `POST` request, which queries the `users` collection. Email is used as the unique key for checking records.
   - For signing up: if the user's email already exists in the database, a `400` error response will be returned. Else, the user's record will be successfully inserted, and a `200` ok response will be returned along with his entered credentials.
   - For logging in: if the user's email does not exist in the database or if the entered password is wrong, a `401` response will be returned due to invalid credentials. Else, a `200` ok response will be returned along with his entered credentials.
2. `python3 test.metadata.py` will retrieve the first metadata from the `kindle_metadata` collection.
   - Currently standalone, need to integrate with flask endpoints.
