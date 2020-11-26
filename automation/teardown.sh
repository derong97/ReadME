#!/bin/bash

if [ "$EUID" -ne 0 ]
  then echo "Please run as root"
  exit
fi

keyname=$(grep KeyName logs.log | sed -e 's/.*KeyName=\(\S*\).*/\1/g')
stackname=$(grep StackName logs.log | sed -e 's/.*StackName=\(\S*\).*/\1/g')

# Remove private key from local machine
echo "Removing private key from local machine..."
rm $keyname.pem

# Remove config.json
echo "Removing cloud formation configs from local machine..."
rm ./cloud_formation/config.json

# Remove public key from EC2
echo "Removing public key from AWS..."
aws ec2 delete-key-pair --key-name $keyname

# Delete cloud formation stack
echo "Removing cloud formation stack from AWS..."
aws cloudformation delete-stack --stack-name $stackname

# Remove logs
echo "Removing logs from local machine..."
rm logs.log

echo "Teardown completed"
echo "🕮 Goodbye! By ReadMe 🕮"