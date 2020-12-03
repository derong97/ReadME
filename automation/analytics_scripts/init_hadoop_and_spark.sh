#!/bin/bash

sudo MongoDBIP=$MongoDBIP MySQLIP=$MySQLIP su -p - hadoop

# Start hadoop cluster
/opt/hadoop-3.3.0/sbin/start-dfs.sh && /opt/hadoop-3.3.0/sbin/start-yarn.sh
sleep 1

# Start spark cluster
/opt/spark-3.0.1-bin-hadoop3.2/sbin/start-all.sh
sleep 1

# Ingest data from MongoDB and MySQL
until mongoexport --host=$MongoDBIP:27017 --username=historicriptide --password=futuresparkles --authenticationDatabase=admin --db=readme_mongo --collection=kindle_metadata --out=/home/hadoop/kindle_meta.json; do
  echo "Mongo download failed, retrying in 2 seconds..."
  echo "MongoDBIP is: ${MongoDBIP}"
  echo "MySQLIP is ${MySQLIP}"
  sleep 2
done

until mysql -u historicriptide -pfuturesparkles -h $MySQLIP --port=3306 --batch --raw -e 'select asin, reviewText FROM readme_sql.Kindle' > /home/hadoop/kindle_reviews.csv; do
  echo "SQL download failed, retrying in 2 seconds..."
  echo "MongoDBIP is: ${MongoDBIP}"
  echo "MySQLIP is ${MySQLIP}"
  sleep 2
done

# Copy data to hdfs
/opt/hadoop-3.3.0/bin/hadoop fs -mkdir /data
/opt/hadoop-3.3.0/bin/hadoop fs -rm /data/kindle_reviews.csv
/opt/hadoop-3.3.0/bin/hadoop fs -rm /data/kindle_meta.json
/opt/hadoop-3.3.0/bin/hadoop fs -put /home/hadoop/kindle_reviews.csv /data/kindle_reviews.csv
/opt/hadoop-3.3.0/bin/hadoop fs -put /home/hadoop/kindle_meta.json /data/kindle_meta.json