#!/bin/bash

sudo su - hadoop

# Copy data to hdfs
/opt/hadoop-3.3.0/bin/hadoop fs -mkdir /data
/opt/hadoop-3.3.0/bin/hadoop fs -put /home/hadoop/kindle_reviews.tsv /data/kindle_reviews.tsv
/opt/hadoop-3.3.0/bin/hadoop fs -put /home/hadoop/kindle_meta.json /data/kindle_meta.json