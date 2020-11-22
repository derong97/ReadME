#!/bin/bash

wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start the MongoDB service
sudo systemctl start mongod.service
# Enable the MongoDB service to startup at boot (and reboots)
sudo systemctl enable mongod
sleep 3s

wget https://www.dropbox.com/s/9q8quw3elgxa8tl/mongo_intermediary.js?dl=0 -O mongo_intermediary.js
sleep 1s

mongo admin < mongo_intermediary.js
sleep 3s
sudo service mongod restart

# To enable authentication. Ppl can still connect but can't read/write without authentication
sudo sh -c 'echo "security:\n  authorization : enabled" >> /etc/mongod.conf'
# To enable remote connections. Methinks you need this for pymongo to work.
sudo sed -i "s,\\(^[[:blank:]]*bindIp:\\) .*,\\1 0.0.0.0," /etc/mongod.conf
sudo service mongod restart

wget https://www.dropbox.com/s/bybard0tczemmqn/kindle_metadata_with_title_and_avgrating.json?dl=0 -O kindle_metadata_with_title_and_avgrating.json

# Load the (project) metadata with titles and average_ratings into our database
echo "Loading data into MongoDB."
mongoimport --authenticationDatabase admin -u "historicriptide" -p "futuresparkles" -d readme_mongo -c kindle_metadata --file kindle_metadata_with_title_and_avgrating.json --legacy

sleep 3s

echo "MongoDB SetUp complete"

# Remote Connection (using another shell with mongoshell installed), Use your EC2 public IP address
# mongo "mongodb://historicriptide@<IP address here>:27017" -p "futuresparkles"

# Remote Connection with PyMongo, Use your EC2 public IP address
# client = pymongo.MongoClient("mongodb://<IP address here>:27017", username='historicriptide', password='futuresparkles')