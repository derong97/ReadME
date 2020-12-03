#!/bin/bash

sudo su - hadoop

# Start hadoop cluster
/opt/hadoop-3.3.0/sbin/start-dfs.sh && /opt/hadoop-3.3.0/sbin/start-yarn.sh
sleep 1

# Start spark cluster
/opt/spark-3.0.1-bin-hadoop3.2/sbin/start-all.sh
sleep 1

# Copy data to hdfs
/opt/hadoop-3.3.0/bin/hadoop fs -mkdir /data
/opt/hadoop-3.3.0/bin/hadoop fs -rm /data/kindle_reviews.csv
/opt/hadoop-3.3.0/bin/hadoop fs -rm /data/kindle_meta.json
/opt/hadoop-3.3.0/bin/hadoop fs -put /home/hadoop/kindle_reviews.csv /data/kindle_reviews.csv
/opt/hadoop-3.3.0/bin/hadoop fs -put /home/hadoop/kindle_meta.json /data/kindle_meta.json