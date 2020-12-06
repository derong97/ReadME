#!/bin/bash

sudo su - hadoop

MASTER=$(curl ifconfig.me)

/opt/spark-3.0.1-bin-hadoop3.2/bin/spark-submit --master spark://MASTER:7077 /home/hadoop/correlation.py namenode
/opt/spark-3.0.1-bin-hadoop3.2/bin/spark-submit --master spark://MASTER:7077 /home/hadoop/tfidf.py namenode