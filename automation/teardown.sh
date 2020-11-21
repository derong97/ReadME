#!/bin/bash

if [ "$EUID" -ne 0 ]
  then echo "Please run as root"
  exit
fi

keyname=$(grep KeyName logs.log | sed -e 's/.*KeyName=\(\S*\).*/\1/g')
stackname=$(grep StackName logs.log | sed -e 's/.*StackName=\(\S*\).*/\1/g')

# Remove private key from local machine
rm $keyname.pem

# Remove public key from EC2
aws ec2 delete-key-pair --key-name $keyname

# Delete cloud formation stack
aws cloudformation delete-stack --stack-name $stackname

rm logs.log

echo "Teardown completed"
echo "🕮 Goodbye! By ReadMe 🕮"