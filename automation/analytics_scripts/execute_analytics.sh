#!/bin/bash

sudo MongoDBIP=$MongoDBIP MySQLIP=$MySQLIP su -p - hadoop

# Download correlation.py and tfidf.py from Dropbox
wget https://www.dropbox.com/s/9wc576uge97okwr/correlation.py?dl=0 -O /home/hadoop/correlation.py &
wget https://www.dropbox.com/s/y7rc4lmvh3u53jj/tfidf.py?dl=0 -O /home/hadoop/tfidf.py &

# Ingest data from MongoDB
mongoexport --host=$MongoDBIP:27017 --username=historicriptide --password=futuresparkles --authenticationDatabase=admin --db=readme_mongo --collection=kindle_metadata --out=/home/hadoop/kindle_meta.json &

# Ingest data from MySQL
mysql -u historicriptide -pfuturesparkles -h $MySQLIP --port=3306 --batch --raw -e 'select asin, reviewerID, reviewText FROM readme_sql.Kindle' > /home/hadoop/kindle_reviews.tsv &

wait

/opt/hadoop-3.3.0/bin/hdfs dfs -rm -r /data
/opt/hadoop-3.3.0/bin/hdfs dfs -rm -r /corr
/opt/hadoop-3.3.0/bin/hdfs dfs -rm -r /tfidf

# Copy data to hdfs
/opt/hadoop-3.3.0/bin/hdfs dfs -mkdir /data
/opt/hadoop-3.3.0/bin/hdfs dfs -put /home/hadoop/kindle_reviews.tsv /data/kindle_reviews.tsv
/opt/hadoop-3.3.0/bin/hdfs dfs -put /home/hadoop/kindle_meta.json /data/kindle_meta.json