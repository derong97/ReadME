#!/bin/bash

sudo su - hadoop

# Start hadoop cluster
/opt/hadoop-3.3.0/sbin/start-dfs.sh && /opt/hadoop-3.3.0/sbin/start-yarn.sh
sleep 1

# Start spark cluster
/opt/spark-3.0.1-bin-hadoop3.2/sbin/start-all.sh
sleep 1