# First Time Set-up

### Set-up EC2 instances

- Follow the steps in `ReadMe/automation`. At the end you should have your 2 distinct instances - one for MongoDB, another for MySQL.

### Download prerequisites

Note: skip this section if you already have all the prerequisites

- Install python3 `sudo apt install python3`
- Download [node.js](https://nodejs.org/en/download/)
- Install MySQL client with `sudo apt-get install python3.6-dev libmysqlclient-dev`

### Download packages to your virtual environment

- Clone ReadMe repo.
- `cd` into `ReadMe/server`, then create an isolated python environment: `python3 -m venv venv`
- Activate your virtual environment: `source venv/bin/activate`. 
- Install all packages: `pip install -r requirements.txt`

### Building React App

- Navigate to the React app directory: `cd ../frontend`
- Install the packages from npm: `npm install`
- Build the app to the Flask template using `npm run build` to build the latest version of your app
* Shortcut to build the app to the Flask template and start the Flask server: `npm run start-flask` *

### Start Flask Server

- Navigate back to the server directory: `cd ../server`
- Create your personal environment file (to contain your local variables): `touch .env`. Copy and paste the keys from the template file `env_template`. Modify the values accordingly.
- Start the Server: `flask run`

### Run Tests

- See below for lists of test.

<br>

# Update when Pulling new Commits

- `cd` into `ReadMe/server`, then activate your virtual environment: `source venv/bin/activate`. 
- `cd ../frontend`, to install (any new) packages using npm: `npm install`
- Build the app to the Flask template using `npm run build` to build the latest version of your app
- Navigate back to the server directory: `cd ../server`
- Install any (newly committed) packages: `pip install -r requirements.txt`
- Start the Server: `flask run`
- Run tests. See the section on tests.



<br>

# Tests and Checks

## Sanity Check/s

From the `/server` folder, you can run checks to ensure that the endpoints are working

`python3 -m tests.test_mongo_connection` provides a sanity check on whether you can connect to MongoDB server directly (through `PyMongo`). This is independent from the Flask server. 

## Endpoint Tests

From the `/server` folder, you can run tests to ensure that the endpoints are working as expected.

1. `python3 -m tests.test_user` simulates a test user signup and login on the website through a `POST` request, which queries the `users` collection. Email is used as the unique key for checking records.
   - For signing up: If the user's email already exists in the database, a `400` error response will be returned. If the user's record will be successfully inserted, a `200` ok response will be returned.
   - For logging in: If the user's email does not exist in the database or if the entered password is incorrect, a `401` response will be returned due to invalid credentials. If successful, a `200` ok response will be returned.
2. `python3 -m tests.test_metadata` retrieves the first metadata from the `kindle_metadata` collection.
3. `python3 -m tests.test_review_select` returns 5 reviewID, reviewTime, and summary from the table.
4. `python3 -m tests.test_review_insert` inserts a test review into the table.





<hr>

<br>

# You should be setting up MongoDB and MySQL in EC2 instances, rather than locally.

## However, if you still want to, you can follow these instructions.

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
4. Run the SQL script in MySQL Workbench. Use the wizard import tool to load the `kaggle_processed.csv`

<hr>
