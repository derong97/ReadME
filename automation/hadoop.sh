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
cluster_size=2 # TODO: will change based on user input

{
  stackname=Hadoop$cluster_size
  echo "StackName=$stackname" | tee -a logs.log

  echo "Deploying Cloud Formation Stack"
  aws cloudformation create-stack --stack-name $stackname --template-body file://./cloud_formation/hadoop2_template.json --parameters ParameterKey=KeyName,ParameterValue=$keyname
  
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

### DATANODE IP ADDRESSES ###
declare -a HadoopPublicIPs=()
declare -a HadoopPrivateIPs=()

for ((i=0;i<cluster_size;i++)); do
  # PUBLIC IP ADDRESSES OF ALL NODES
  temp=Node${i}PublicIP
  declare $temp=$(aws cloudformation describe-stacks --stack-name $stackname --query "Stacks[0].Outputs[?OutputKey=='Node${i}PublicIP'].OutputValue" --output text)
  HadoopPublicIPs+=(${!temp})
  echo "$temp=${!temp}" | tee -a logs.log
  
  # PRIVATE IP ADDRESSES OF ALL NODES
  temp=Node${i}PrivateIP
  declare $temp=$(aws cloudformation describe-stacks --stack-name $stackname --query "Stacks[0].Outputs[?OutputKey=='Node${i}PrivateIP'].OutputValue" --output text)
  HadoopPrivateIPs+=(${!temp})
  echo "$temp=${!temp}" | tee -a logs.log
done

### HADOOP SETUP ###

for ip in ${HadoopPublicIPs[@]}
do
  echo "Initializing Cluster Setup for $ip"
  sudo ssh -o StrictHostKeyChecking=no ubuntu@$ip -i $keyname.pem 'bash -s' < ./scripts/initial_cluster_setup.sh ${HadoopPrivateIPs[@]}
done

i=0
for ip in ${HadoopPublicIPs[@]}
do
  echo "Generating ssh keys for $ip"
  if [ $i -eq 0 ]
  then
    # SSH key generation for namenode
    sudo ssh -o StrictHostKeyChecking=no ubuntu@$ip -i $keyname.pem "sudo apt-get install -y ssh; 
    sudo ssh-keygen -f /home/hadoop/.ssh/id_rsa -N ''; 
    cat /home/hadoop/.ssh/id_rsa.pub | sudo tee -a /home/hadoop/.ssh/authorized_keys"

    sleep 1
  else
    # Copy the generated keys from namenode to every datanode
    sudo ssh -o StrictHostKeyChecking=no ubuntu@$Node0PublicIP -i $keyname.pem "sudo cat /home/hadoop/.ssh/id_rsa.pub" \
    | sudo ssh -o StrictHostKeyChecking=no ubuntu@$ip -i $keyname.pem "sudo cat - | sudo tee -a /home/hadoop/.ssh/authorized_keys"
  fi
  i=$((i+1))
done

echo "done"