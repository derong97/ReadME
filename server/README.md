# First Time Set-up

## Set-up EC2 instances

- Follow the steps in `ReadMe/automation`. At the end you should have your 2 separate instances (one for MongoDB, another for MySQL).

## Download prerequisites

Note: skip this section if you already have all the prerequisites

- Install python3 `sudo apt install python3`
- Download [node.js](https://nodejs.org/en/download/)

## Download packages to your virtual environment

- Clone ReadMe repo.
- `cd` into `ReadMe/server`, then create an isolated python environment: `python3 -m venv venv`
- Activate your virtual environment: `source venv/bin/activate`
- Install all packages: `pip install -r requirements.txt`

## Create personal envrionment file

- In the same folder, create your personal environment file which contains your secret variables: `touch .env`.
- Copy and paste the keys from the template file `env_template`. Modify the values accordingly.

## Building React App and starting Gunicorn server

- Navigate to the React app directory: `cd ../frontend`
- Install the packages from npm: `npm install`
- Build the latest version of your app to the static folder, and start the Gunicorn server using `npm run gunicorn`

# Update when pulling new commits

- `cd` into `ReadMe/server`, then activate your virtual environment: `source venv/bin/activate`.
- `cd ../frontend`, to install any new packages using npm: `npm install`
- Build the app to the Flask template using `npm run build` to build the latest version of your app
- Navigate back to the server directory: `cd ../server`
- Install any newly committed packages: `pip install -r requirements.txt`
- Start the Server: `flask run`
