#!/bin/bash

sudo MongoDBIP=$MongoDBIP MySQLIP=$MySQLIP su -p - hadoop

wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list
sudo apt-get update
sudo apt-get install -y mongodb-org

echo "Installed Mongo."

export DEBIAN_FRONTEND=noninteractive
sudo -E apt-get -q -y install mysql-server

echo "Installed MySQL."

# Download correlation.py and tfidf.py from Dropbox
wget https://www.dropbox.com/s/9wc576uge97okwr/correlation.py?dl=0 -O correlation.py
sleep 1

wget https://www.dropbox.com/s/y7rc4lmvh3u53jj/tfidf.py?dl=0 -O tfidf.py
sleep

# Download packages for tf-idf task
sudo apt-get install python3-numpy

# Ingest data from MongoDB
mongoexport --host=$MongoDBIP:27017 --username=historicriptide --password=futuresparkles --authenticationDatabase=admin --db=readme_mongo --collection=kindle_metadata --out=/home/hadoop/kindle_meta.json

# Ingest data from MySQL
mysql -u historicriptide -pfuturesparkles -h $MySQLIP --port=3306 --batch --raw -e 'select asin, reviewerID, reviewText FROM readme_sql.Kindle' > /home/hadoop/kindle_reviews.tsv