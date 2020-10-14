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

# Create db and collection
mongo
use readme_mongo;
db.createCollection("kindle_metadata")
db.createCollection("users")
exit()

# Load metadata to localhost MongoDB
mongoimport -d readme_mongo -c kindle_metadata --file meta_Kindle_Store.json --legacy