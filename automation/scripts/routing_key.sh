#!/bin/bash

# takes in public IP addresses
# first IP belongs to namenode

i=0;
for ip in "$@"
do
	if [ $i -ne 0 ]
	then 
		ssh ubuntu@$1 -i key.pem "sudo cat /home/hadoop/.ssh/id_rsa.pub" | ssh ubuntu@$ip -i key.pem "sudo cat - | sudo tee -a /home/hadoop/.ssh/authorized_keys"
		sleep 1
	fi
	i=$((i+1));
done