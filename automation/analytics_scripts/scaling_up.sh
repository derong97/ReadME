#!/bin/bash

sudo ADDIP=$1 su -p - hadoop

/opt/hadoop-3.3.0/sbin/stop-dfs.sh && /opt/hadoop-3.3.0/sbin/stop-yarn.sh
/opt/spark-3.0.1-bin-hadoop3.2/sbin/stop-all.sh

sudo sed -i "/$ADDIP/s/^/#/g" /etc/hosts

/opt/spark-3.0.1-bin-hadoop3.2/sbin/start-all.sh
/opt/hadoop-3.3.0/sbin/start-dfs.sh && /opt/hadoop-3.3.0/sbin/start-yarn.sh