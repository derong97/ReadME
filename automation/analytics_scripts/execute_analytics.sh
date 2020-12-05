#!/bin/bash

sudo su - hadoop

hdfs dfs -rm -r /corr
hdfs dfs -rm -r /tfidf

MASTER=$(curl ifconfig.me)

/opt/spark-3.0.1-bin-hadoop3.2/bin/spark-submit --master spark://MASTER:7077 correlation.py namenode
/opt/spark-3.0.1-bin-hadoop3.2/bin/spark-submit --master spark://MASTER:7077 tfidf.py namenode