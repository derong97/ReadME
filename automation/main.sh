#!/bin/bash

echo "🕮 Welcome to ReadMe 🕮" 

if [ "$EUID" -ne 0 ]
  then echo "Please run as root"
  exit
fi

### INSTALL AWS CLI ###
{
  aws --version
  echo "AWS CLI already installed"
} || {
  # Install only if there is an error
  if [ "$OSTYPE" == "linux-gnu" ]; then
    curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" 
    unzip awscliv2.zip
    sudo ./aws/install
    rm awscliv2.zip
    rm -r aws
  else
    echo "Use a linux machine"
    exit
  fi
}

### CONFIGURE AWS CREDENTIALS ###
# prompts user to enter (1) access key, (2) secret key, (3) region: us-east-1
/usr/local/bin/aws configure

# Session token is needed to prevent AuthFailure
while :
do
  read -p "Enter AWS Session Token:" aws_session_token

  # If there is user input, set token. Otherwise prompt the user again.
  if [[ ! -z "$aws_session_token" ]]; then
    gawk -i inplace '!/aws_session_token/' ~/.aws/credentials
    echo "aws_session_token = $aws_session_token" >> ~/.aws/credentials
    break
  fi
done


### CREATE KEY PAIR ###
{
  read -p "Enter desired keyname [default]:" keyname

  # If there is no user input, set keyname as default 
  if [[ -z "$keyname" ]]; then
    keyname=default
  fi

  # Public key stored on AWS; private key is stored locally
  aws ec2 create-key-pair --key-name $keyname --query 'KeyMaterial' --output text > $keyname.pem
  chmod 400 $keyname.pem
  echo "KeyName=$keyname" >> logs.log

  # Change the KeyName: default -> KeyName: $keyname
  cat ./cloud_formation/template.json | sed '/KeyName/ s/\"default"/\"'$keyname'"/' > ./cloud_formation/config.json
} || {
  echo "Error generating key pair"
  exit
}

### DEPLOY CLOUD FORMATION ###
{
  stackname=ReadMeStack
  echo "StackName=$stackname" | tee -a logs.log

  echo "Deploying Cloud Formation Stack"
  aws cloudformation create-stack --stack-name $stackname --template-body file://./cloud_formation/config.json
  
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

### Get IP addresses of EC2 instances
{
  echo "Generating IP addresses..."
  WebServerIP=$(aws cloudformation describe-stacks --stack-name $stackname --query "Stacks[0].Outputs[?OutputKey=='WebServerIP'].OutputValue" --output text)
  MySQLIP=$(aws cloudformation describe-stacks --stack-name $stackname --query "Stacks[0].Outputs[?OutputKey=='MySQLIP'].OutputValue" --output text)
  MongoDBIP=$(aws cloudformation describe-stacks --stack-name $stackname --query "Stacks[0].Outputs[?OutputKey=='MongoDBIP'].OutputValue" --output text)

  echo "WebServerIP=$WebServerIP" | tee -a logs.log
  echo "MySQLIP=$MySQLIP" | tee -a logs.log
  echo "MongoDBIP=$MongoDBIP" | tee -a logs.log
} || {
  echo "Error getting IP addresses"
  exit
}

### SET UP MYSQL ###
{
  echo "Setting up MySQL"
  ssh -o StrictHostKeyChecking=no ubuntu@$MySQLIP -i ./$keyname.pem 'bash -s' < ./scripts/sql_script.sh
} || {
  echo "Error setting up MySQL server"
  exit
}

### SET UP MONGODB ###
{
  echo "Setting up MongoDB"
  ssh -o StrictHostKeyChecking=no ubuntu@$MongoDBIP -i ./$keyname.pem 'bash -s' < ./scripts/mongo_script.sh
} || {
  echo "Error setting up MongoDB server"
  exit
}

### SET UP WEBSERVER ###
{
  echo "Setting up WebServer"
  ssh -o StrictHostKeyChecking=no ubuntu@$WebServerIP -i ./$keyname.pem "MongoDBIP='$MongoDBIP' MySQLIP='$MySQLIP' WebServerIP='$WebServerIP' bash -s" < ./scripts/webserver_script.sh
} || {
  echo "Error setting up webserver"
  exit
}