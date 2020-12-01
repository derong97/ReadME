#!/bin/bash

sudo apt-get install -y ssh

sudo ssh-keygen -f /home/hadoop/.ssh/id_rsa -N ""
sleep 1
sudo chown hadoop:hadoop /home/hadoop/.ssh/id_rsa
sleep 1

sudo cat /home/hadoop/.ssh/id_rsa.pub | sudo tee -a /home/hadoop/.ssh/authorized_keys

echo "Generated SSH keys"