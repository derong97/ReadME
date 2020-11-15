#!/bin/bash

# IMPORTANT: FOLLOW THESE INSTRUCTIONS FIRST.
# 1. Launch a distinct EC2 instance from the course provided AMI. Note that you have 2 instances, one for MySQL, and the other for MongoDB
# 2. Allow global IP inbound connection on port 27017 through EC2 dashboard (wizard)
# 3. SSH in (ssh ubuntu@<ip-address> -i <path-to-key>)and run the following lines:

# Download and install MongoDB using instructions from https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-18-04-source
wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start the MongoDB service
sudo systemctl start mongod.service
# Enable the MongoDB service to startup at boot (and reboots)
sudo systemctl enable mongod

# Debug: uncomment the following line. Expected result: Successful connection.
# mongo --eval 'db.runCommand({ connectionStatus: 1 })'

# Enter mongo, and create the administrative user of this MongoDB cluster. Remember the username and password.
mongo
use admin
db.createUser({	user: "historicriptide",
				pwd: "futuresparkles", 
				roles: [ { role: "userAdminAnyDatabase", db: "admin" }, "readWriteAnyDatabase" ] });
exit

# To enable authentication. Ppl can still connect but can't read/write without authentication
sudo sh -c 'echo "security:\n  authorization : enabled" >> /etc/mongod.conf'
# To enable remote connections. Methinks you need this for pymongo to work.
sudo sed -i "s,\\(^[[:blank:]]*bindIp:\\) .*,\\1 0.0.0.0," /etc/mongod.conf
sudo service mongod restart

# Install gdown
sudo apt install python3-pip -y
pip3 install gdown
# Note you may encounter errors in gdown. If so try 'sudo reboot'. Then wait 2-3 minutes.
# Download the metadata (preprocessed with titles included)
gdown https://drive.google.com/uc?id=1xyr4AZWrNcMIkOE6NBgFSrm9cnvzpcRO

# Load the (project) metadata with titles and average_ratings into our database
mongoimport --authenticationDatabase admin -u "historicriptide" -p "futuresparkles" -d readme_mongo -c kindle_metadata --file kindle_metadata_with_title_and_avgrating.json --legacy

# Remote Connection (using another shell with mongoshell installed), Use your EC2 public IP address
# mongo "mongodb://historicriptide@<IP address here>:27017" -p "futuresparkles"

# Remote Connection with PyMongo, Use your EC2 public IP address
# client = pymongo.MongoClient("mongodb://<IP address here>:27017", username='historicriptide', password='futuresparkles')