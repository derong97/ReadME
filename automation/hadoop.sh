#!/bin/bash

echo "This is for hadoop testing. Will merge with main.sh eventually" 

if [ "$EUID" -ne 0 ]
  then echo "Please run as root"
  exit
fi

### INSTALL AWS CLI ###
if ! command -v aws configure &> /dev/null
then
  if [ "$OSTYPE" == "linux-gnu" ]; then
    curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" 
    sudo apt-get install -y unzip
    unzip awscliv2.zip
    sudo ./aws/install
    rm awscliv2.zip
    rm -r aws
  else
    echo "Use a linux machine"
    exit
  fi
fi

### CONFIGURE AWS CREDENTIALS ###
# prompts user to enter (1) access key, (2) secret key, (3) region: us-east-1
/usr/local/bin/aws configure

# Session token is needed to prevent AuthFailure
read -p "Enter AWS Session Token:" aws_session_token

if [[ ! -z "$aws_session_token" ]]; then
  gawk -i inplace '!/aws_session_token/' ~/.aws/credentials
  echo "aws_session_token = $aws_session_token" >> ~/.aws/credentials
fi

### CREATE KEY PAIR ###
{
  read -p "Enter desired keyname [default]:" keyname

  # If there is no user input, set keyname as default 
  if [[ -z "$keyname" ]]; then
    keyname=default
  fi

  # Public key stored on AWS; private key is stored locally
  aws ec2 create-key-pair --key-name $keyname --query 'KeyMaterial' --output text > $keyname.pem
  sudo chmod 400 $keyname.pem
  echo "KeyName=$keyname" >> logs.log

} || {
  echo "Error generating key pair"
  exit
}

### DEPLOY CLOUD FORMATION ###
{
  stackname=Hadoop2
  echo "StackName=$stackname" | tee -a logs.log

  echo "Deploying Cloud Formation Stack"
  aws cloudformation create-stack --stack-name $stackname --template-body file://./cloud_formation/analytics_template.json --parameters ParameterKey=KeyName,ParameterValue=$keyname
  
  # Ping status
  while :
  do 
    aws cloudformation describe-stacks --stack-name $stackname --query "Stacks[][ [ StackName, StackStatus ] ][]" --output text | grep -q 'CREATE_COMPLETE'
    if [ $? == 0 ]; then
      echo "Stack Status is complete!"
      break
    else
      echo "Stack Status still not complete. Pinging status again... "
      sleep 3s
    fi
  done
} || {
  echo "Error deploying Cloud Formation Stack"
  exit
}

### Get IP addresses of EC2 instances ###
{
  echo "Generating IP addresses..."
  NameNodePublicIP=$(aws cloudformation describe-stacks --stack-name $stackname --query "Stacks[0].Outputs[?OutputKey=='NameNodePublicIP'].OutputValue" --output text)
  NameNodePrivateIP=$(aws cloudformation describe-stacks --stack-name $stackname --query "Stacks[0].Outputs[?OutputKey=='NameNodePrivateIP'].OutputValue" --output text)
  DataNode1PrivateIP=$(aws cloudformation describe-stacks --stack-name $stackname --query "Stacks[0].Outputs[?OutputKey=='DataNode1PrivateIP'].OutputValue" --output text)

  echo "NameNodePublicIP=$NameNodePublicIP" | tee -a logs.log
  echo "NameNodePrivateIP=$NameNodePrivateIP" | tee -a logs.log
  echo "DataNode1PrivateIP=$DataNode1PrivateIP" | tee -a logs.log
} || {
  echo "Error getting IP addresses"
  exit
}

echo "done"