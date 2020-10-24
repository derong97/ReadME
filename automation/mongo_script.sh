#!/bin/bash

# 1. Launch the EC2 instance rom the course provided AMI, 
# 2. Allow global IP inbound connection on port 27017 through EC2 dashboard (wizard)
# 3. SSH in and run the following lines:

# Get metadata
wget -c https://istd50043.s3-ap-southeast-1.amazonaws.com/meta_kindle_store.zip -O meta_kindle_store.zip
sudo apt-get install unzip
unzip meta_kindle_store.zip
rm -rf *.zip

# Download mongoDB using instructions from https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-18-04-source
curl -fsSL https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start the MongoDB service
sudo systemctl start mongod.service
# Enable the MongoDB service to startup at boot (and reboots)
sudo systemctl enable mongod

# Debug: uncomment the following line. Expected result: Successful connection.
# mongo --eval 'db.runCommand({ connectionStatus: 1 })'

# Enter mongo, and create the administrative user of this MongoDB cluster.
mongo
use admin
db.createUser({ user: "admin",
				pwd: "password", 
				roles: [ { role: "userAdminAnyDatabase", db: "admin" }, "readWriteAnyDatabase" ] });
exit

# To enable authentication. Ppl can still connect but can't read/write without authentication
sudo sh -c 'echo "security:\n  authorization : enabled" >> /etc/mongod.conf'
# To enable remote connections. Methinks you need this for pymongo to work.
sudo sed -i "s,\\(^[[:blank:]]*bindIp:\\) .*,\\1 0.0.0.0," /etc/mongod.conf
sudo service mongod restart

# Load the (project) metadata into our database
mongoimport --authenticationDatabase admin -u "admin" -p "password" -d readme_mongo -c kindle_metadata --file meta_Kindle_Store.json --legacy

# Remote Connection (using another shell with mongoshell installed), Use your EC2 public IP address
# mongo "mongodb://admin@<IP address here>:27017" -p "password"

# Remote Connection with PyMongo, Use your EC2 public IP address
# client = pymongo.MongoClient("mongodb://<IP address here>:27017", username='admin', password='password')

