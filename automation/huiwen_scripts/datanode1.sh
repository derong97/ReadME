#!/bin/bash

sudo su - hadoop

tar zxvf hadoop-3.3.0.tgz
sudo mv hadoop-3.3.0 /opt/

sudo mkdir -p /mnt/hadoop/datanode/

sleep 1

sudo chown -R hadoop:hadoop /mnt/hadoop/datanode/

sleep 1

echo "Setting up Spark"

tar zxvf spark-3.0.1-bin-hadoop3.2.tgz

sleep 1

sudo mv spark-3.0.1-bin-hadoop3.2 /opt/
sudo chown -R hadoop:hadoop /opt/spark-3.0.1-bin-hadoop3.2

echo "Setup of Spark finished."