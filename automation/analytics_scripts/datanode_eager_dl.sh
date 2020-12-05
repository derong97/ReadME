#!/bin/bash

sudo su - hadoop
echo "Entered as hadoop user"

sudo apt-get update
sudo apt-get install -y openjdk-8-jdk
echo "Installed Java"

sudo apt install python3-pip -y
pip3 install numpy==1.18.5
echo "Installed packages for tfidf task"