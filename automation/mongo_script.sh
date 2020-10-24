#!/bin/bash

# Get metadata
wget -c https://istd50043.s3-ap-southeast-1.amazonaws.com/meta_kindle_store.zip -O meta_kindle_store.zip
sudo apt-get install unzip
unzip meta_kindle_store.zip

# Clean up
rm -rf *.zip

# Download mongoDB using instructions from https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/
wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list
sudo apt-get update
sudo apt-get install -y mongodb-org

# Install package
sudo apt-install mongo-tools

# Start MongoDB
sudo systemctl start mongod

# Create db and collection
mongo
use readme_mongo;
db.createUser({ user: "admin", pwd: "password", roles: [{ role: 'readWrite', db:'readme_mongo'}] });
db.createCollection("kindle_metadata");
db.createCollection("users");
exit

# Enable security and restart MongoDB
sudo sed -i "s,\\(^[[:blank:]]*bindIp:\\) .*,\\1 0.0.0.0," /etc/mongod.conf
sudo sh -c 'echo "security:\n  authorization : enabled" >> /etc/mongod.conf'
sudo service mongod restart

# Load metadata to localhost MongoDB
mongoimport -d readme_mongo -c kindle_metadata --file meta_Kindle_Store.json --legacy

# Need to enable TCP port 27017 accessible from 0.0.0.0 as well
# TODO: not sure why cannot connect