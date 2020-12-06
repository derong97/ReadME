#!/bin/bash

sudo su - hadoop
echo "Entered as hadoop user"

sudo apt-get update
sudo apt-get install -y openjdk-8-jdk
echo "Installed Java"

{
    echo "Setting up Hadoop"

    tar zxvf hadoop-3.3.0.tgz
    sudo mv hadoop-3.3.0 /opt/

    sudo mkdir -p /mnt/hadoop/datanode/
    sudo chown -R hadoop:hadoop /mnt/hadoop/datanode/
} &

{
    echo "Setting up Spark"

    tar zxvf spark-3.0.1-bin-hadoop3.2.tgz

    sudo mv spark-3.0.1-bin-hadoop3.2 /opt/
    sudo chown -R hadoop:hadoop /opt/spark-3.0.1-bin-hadoop3.2

    echo "Setup of Spark finished."

} &

{
    sudo apt-get install python3-numpy
    echo "Installed packages for tfidf task"
} &

wait

sudo rm /home/hadoop/hadoop-3.3.0.tgz
sudo rm /home/hadoop/spark-3.0.1-bin-hadoop3.2.tgz