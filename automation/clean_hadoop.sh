#!/bin/bash

if [ "$EUID" -ne 0 ]
  then echo "Please run as root"
  exit
fi

keyname=$(grep KeyName logs.log | sed -e 's/.*KeyName=\(\S*\).*/\1/g')
stackname=$(grep StackName logs.log | sed -e 's/.*StackName=\(\S*\).*/\1/g')

### MAKE SURE CLOUD RESOURCES ARE DELETED FIRST ###
{
  # Delete cloud formation stack
  echo "Removing cloud formation stack from AWS..."
  aws cloudformation delete-stack --stack-name $stackname

  # Remove public key from EC2
  echo "Removing public key from AWS..."
  aws ec2 delete-key-pair --key-name $keyname

  # Remove private key from local machine
  echo "Removing private key from local machine..."
  rm $keyname.pem

  # Remove logs
  echo "Removing logs from local machine..."
  rm logs.log

  echo "Teardown completed"
  echo "🕮 Goodbye! By ReadMe 🕮"
} || {
  echo "Error tearing down"
}