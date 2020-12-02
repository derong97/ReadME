#!/bin/bash

wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start the MongoDB service
sudo systemctl start mongod.service
# Enable the MongoDB service to startup at boot/reboots
sudo systemctl enable mongod
sleep 3s

# Create Collection kindle_metadata (under Database readme_mongo) indexed by asin. 
# Create password-authenticated user with root Admin properties. 
sudo cat << EOF > mongo_intermediary.js
use readme_mongo
db.kindle_metadata.createIndex( {asin: 1} )
use admin
db.createUser({user: "historicriptide", pwd: "futuresparkles", roles: [ { role: "userAdminAnyDatabase", db: "admin" }, "readWriteAnyDatabase" ] });
EOF
mongo < mongo_intermediary.js
sleep 3s
sudo service mongod restart

# To enable authentication. Ppl can still connect but can't read/write without authentication
sudo sh -c 'echo "security:\n  authorization : enabled" >> /etc/mongod.conf'
# To enable remote connections. Methinks you need this for pymongo to work.
sudo sed -i "s,\\(^[[:blank:]]*bindIp:\\) .*,\\1 0.0.0.0," /etc/mongod.conf
sudo service mongod restart

wget https://www.dropbox.com/s/bybard0tczemmqn/kindle_metadata_with_title_and_avgrating.json?dl=0 -O kindle_metadata_with_title_and_avgrating.json
sleep 3s

# Load the (project) metadata with titles and average_ratings into our database
echo "Loading data into MongoDB."
mongoimport --authenticationDatabase admin -u "historicriptide" -p "futuresparkles" -d readme_mongo -c kindle_metadata --file kindle_metadata_with_title_and_avgrating.json --legacy
sleep 3s

TIMESTAMP=$(TZ='Asia/Singapore' date +"%d-%m-%Y %H-%M-%S")
x="${TIMESTAMP}"
y="{\"ini_timestamp\": \"${x}\"}"
echo $y > first_entry.json

mongoimport --authenticationDatabase admin -u "historicriptide" -p "futuresparkles" -d readme_mongo -c log --file first_entry.json --legacy
mongoimport --authenticationDatabase admin -u "historicriptide" -p "futuresparkles" -d readme_mongo -c userbase --file first_entry.json --legacy

echo "MongoDB SetUp complete"

# Remote Connection (using another shell with mongoshell installed), Use your EC2 public IP address
# mongo "mongodb://historicriptide@<IP address here>:27017" -p "futuresparkles"

# Remote Connection with PyMongo, Use your EC2 public IP address
# client = pymongo.MongoClient("mongodb://<IP address here>:27017", username='historicriptide', password='futuresparkles')