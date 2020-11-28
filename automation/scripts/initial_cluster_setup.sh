#!/bin/bash
# $1 name node private ip, $2 datanode1 private ip, ...

sudo useradd -m hadoop

i=0
for ip in "$@"
do
	if [ $i -eq 0 ]
	then 
		echo "$ip namenode" | sudo tee -a /etc/hosts
	else
		echo "$ip datanode$i" | sudo tee -a /etc/hosts
	fi
	i=$((i+1));
done

sleep 1

sudo sh -c 'echo "hadoop ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers.d/90-hadoop'

sleep 1

sudo sysctl vm.swappiness=10

sudo mkdir /home/hadoop/.ssh

sleep 1

echo "Directory /home/hadoop/.ssh created"