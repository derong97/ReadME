#!/bin/bash

if [ "$EUID" -ne 0 ]
  then echo "Please run as root"
  exit
fi

echo """
============================================================================
You can just ENTER all the way if your AWS key credentials have not expired
============================================================================
"""

aws configure

# Session token is needed to prevent AuthFailure
read -p "Enter AWS Session Token:" aws_session_token

if [[ ! -z "$aws_session_token" ]]; then
  gawk -i inplace '!/aws_session_token/' ~/.aws/credentials
  echo "aws_session_token = $aws_session_token" >> ~/.aws/credentials
fi

keyname=$(grep KeyName logs.log | sed -e 's/.*KeyName=\(\S*\).*/\1/g')
stackname=$(grep StackName logs.log | sed -e 's/.*StackName=\(\S*\).*/\1/g')

### MAKE SURE CLOUD RESOURCES ARE DELETED FIRST ###
{
  # Delete cloud formation stack
  echo "Removing cloud formation stack from AWS..."
  aws cloudformation delete-stack --stack-name $stackname
  sleep 2

  # Ping status
  while :
  do 
    aws cloudformation describe-stacks --stack-name $stackname --query "Stacks[][ [ StackName, StackStatus ] ][]" --output text | grep -q 'DELETE_IN_PROGRESS'
    if [ $? == 0 ]; then
      echo "Stack Status still not deleted. Pinging status again... "
      sleep 3s
    else
      echo "Stack is deleted!"
      break
    fi
  done

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