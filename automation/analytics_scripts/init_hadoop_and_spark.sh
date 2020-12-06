#!/bin/bash

sudo su - hadoop

# Add hadoop to PATH permanently, so we can call 'hdfs' straightaway.
echo 'export PATH=$PATH:/opt/hadoop-3.3.0/bin' >> ~/.bash_profile

# Start hadoop cluster
/opt/hadoop-3.3.0/sbin/start-dfs.sh && /opt/hadoop-3.3.0/sbin/start-yarn.sh
sleep 1

# Start spark cluster
/opt/spark-3.0.1-bin-hadoop3.2/sbin/start-all.sh
sleep 1