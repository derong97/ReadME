# Local Development

## Start Flask Server with React Frontend

### Download prerequisites

Note: skip this section if you already have all the prerequisites

1. Install python3 `sudo apt install python3`
2. Download [node.js](https://nodejs.org/en/download/)
3. Install MySQL client with `sudo apt-get install python3.6-dev libmysqlclient-dev`

### Download packages to your virtual environment

4. Install and create an isolated python environment: `python3 -m venv venv`
5. Activate your virtual environment: `source venv/bin/activate`. Make sure your virtual environment is activated before proceeding onto the next steps.
6. Install all packages: `pip install -r requirements.txt`

### Building React App

7. Navigate to the React app directory: `cd frontend`
8. Install the packages from npm: `npm install`
9. Build the app to the Flask template using `npm run build` to build the latest version of your app

### Start Flask Server

8. Navigate to the server directory: `cd server`
9. Start the Server: `./run` or `python3 app.py`

## Set up MongoDB (locally)

1. Depending on your OS, install the appropriate MongoDB Community Edition from https://docs.mongodb.com/manual/administration/install-community/
   - Note that MongoDB does not support the Windows Subsystem for Linux (WSL).
2. Use Compasss to set up localhost MongoDB, set up `readme_mongo` database with the following 2 collections:
   - `kindle_metadata` (contains all the books' metadata)
   - `users` (contains all the registered users)
3. Import the kindle metadata
   ```
   wget -c https://istd50043.s3-ap-southeast-1.amazonaws.com/meta_kindle_store.zip -O meta_kindle_store.zip
   sudo apt-get install unzip
   unzip meta_kindle_store.zip
   rm -rf *.zip
   ```
4. Install packages: `sudo apt-install mongo-tools`
5. Import data into `kindle_metadata` collection: `mongoimport -d readme_mongo -c kindle_metadata --file meta_Kindle_Store.json --legacy`
   - Remove the `--legacy` option if the above command does not work for you

## Set up MySQL (locally)

1. Download and install MySQL Workbench from https://dev.mysql.com/downloads/workbench/
2. In MySQL Workbench, setup a new connection and create a new schema `readme_sql`.
3. Download the processed Kaggle data and SQL script from the following links
   - https://drive.google.com/uc?id=1lgrBw_XDaKjlN5fFfF47P8l9Dhm8IRME
   - https://drive.google.com/uc?id=18zKSytgjy56nNRP8z2IsxTVga1jGSiqZ
4. Run the SQL script in MySQL Workbench. If `LOAD DATA LOCAL INFILE` is throwing error, run the line `set global local_infile=true;`. If the error persists, remove the `LOCAL` keyword from the script, run the line `SHOW VARIABLES LIKE "secure_file_priv"` and move the processed Kaggle data file into the output path. Update the SQL script with the current filepath.

## Tests

In the `/tests` folder, you can run tests to ensure that your endpoints are working as expected.

1. `python3 test_user.py` will simulate user signup and login on the website through a `POST` request, which queries the `users` collection. Email is used as the unique key for checking records.
   - For signing up: if the user's email already exists in the database, a `400` error response will be returned. Else, the user's record will be successfully inserted, and a `200` ok response will be returned along with his entered credentials.
   - For logging in: if the user's email does not exist in the database or if the entered password is wrong, a `401` response will be returned due to invalid credentials. Else, a `200` ok response will be returned along with his entered credentials.
2. `python3 test_metadata.py` will retrieve the first metadata from the `kindle_metadata` collection.
   - Currently standalone, need to integrate with flask endpoints.
3. Edit `test_review_select.py` and `test_review_insert.py` with your own credentials. Running `python3 test_review_select.py` returns 5 reviewID, reviewTime, and summary from the table while `python3 test_review_insert.py` inserts a test review into the table. You can check whether the review is actually inserted via MySQL Workbench.
