#!/bin/bash

sudo apt-get install -y ssh

echo "Setting up SSH keys"

sudo ssh-keygen -f /home/ubuntu/.ssh/id_rsa -N ""
sleep 1

sudo cat /home/ubuntu/.ssh/id_rsa.pub | sudo tee -a /home/ubuntu/.ssh/authorized_keys

# sudo chown ubuntu:ubuntu /home/ubuntu/.ssh/id_rsa
# sudo chmod 700 /home/ubuntu/.ssh
# sudo chmod 600 /home/ubuntu/.ssh/authorized_keys