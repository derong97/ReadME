#!/bin/bash

# takes in key (e.g. default.pem) as first arugment
# subsequently takes in public IP addresses
# first IP belongs to namenode

echo "Copying keys to datanodes"

i=0;
for ip in "$@"
do
	if [ $i -ne 0 ] && [ $i -ne 1 ]
	then 
		ssh ubuntu@$2 -i $1 "sudo cat /home/hadoop/.ssh/id_rsa.pub" \
| ssh ubuntu@$ip -i $1 "sudo cat - | sudo tee -a /home/hadoop/.ssh/authorized_keys"
		echo "Copied key to $ip"
			
		sleep 1


	fi
	i=$((i+1));
done

echo "Finished copying keys to datanodes"

