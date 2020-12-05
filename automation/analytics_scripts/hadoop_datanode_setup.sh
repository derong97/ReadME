#!/bin/bash

sudo su - hadoop
echo "Entered as hadoop user"

sudo apt-get update
sudo apt-get install -y openjdk-8-jdk
echo "Installed Java"

tar zxvf hadoop-3.3.0.tgz
sudo mv hadoop-3.3.0 /opt/

sudo rm hadoop-3.3.0.tgz

sudo mkdir -p /mnt/hadoop/datanode/
sudo chown -R hadoop:hadoop /mnt/hadoop/datanode/

echo "Setting up Spark"

tar zxvf spark-3.0.1-bin-hadoop3.2.tgz

sudo mv spark-3.0.1-bin-hadoop3.2 /opt/
sudo chown -R hadoop:hadoop /opt/spark-3.0.1-bin-hadoop3.2

sudo rm spark-3.0.1-bin-hadoop3.2.tgz

echo "Setup of Spark finished."

sudo apt install python3-pip -y
pip3 install numpy==1.18.5
echo "Installed packages for tfidf task"