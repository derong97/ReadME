#!/bin/bash

sudo MongoDBIP=$MongoDBIP MySQLIP=$MySQLIP su -p - hadoop

# Ingest data from MongoDB 
mongoexport --host=$MongoDBIP:27017 --username=historicriptide --password=futuresparkles --authenticationDatabase=admin --db=readme_mongo --collection=kindle_metadata --out=/home/hadoop/kindle_meta.json
sleep 1

# Ingest data from MySQL
mysql -u historicriptide -pfuturesparkles -h $MySQLIP --port=3306 --batch --raw -e 'select asin, reviewText FROM readme_sql.Kindle' > /home/hadoop/kindle_reviews.tsv
tr '\t' ',' < /home/hadoop/kindle_reviews.tsv > /home/hadoop/kindle_reviews.csv
sleep 1

# Copy data to hdfs
/opt/hadoop-3.3.0/bin/hadoop fs -mkdir /data
/opt/hadoop-3.3.0/bin/hadoop fs -put /home/hadoop/kindle_reviews.csv /data/kindle_reviews.csv
/opt/hadoop-3.3.0/bin/hadoop fs -put /home/hadoop/kindle_meta.json /data/kindle_meta.json