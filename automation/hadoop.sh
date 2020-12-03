#!/bin/bash

echo """
============================================================================
                          WELCOME TO HADOOP TRASH
============================================================================
"""

if [ "$EUID" -ne 0 ]
  then echo "Please run as root"
  exit
fi

# AWS Configuration
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


# prompts user to enter (1) access key, (2) secret key, (3) region: us-east-1
/usr/local/bin/aws configure

# Session token is needed to prevent AuthFailure
read -p "Enter AWS Session Token:" aws_session_token

if [[ ! -z "$aws_session_token" ]]; then
  gawk -i inplace '!/aws_session_token/' ~/.aws/credentials
  echo "aws_session_token = $aws_session_token" >> ~/.aws/credentials
fi

echo """
============================================================================
                            APPLICATION CONFIGURATIONS
============================================================================
"""

{
  read -p "Enter desired cluster size (choose 2, 4, 6 or 8): " cluster_size
  if [[ -z "$cluster_size" ]]; then
    cluster_size=2
  fi

  stackname=hadoop$cluster_size
  keyname=${stackname}-key

  # Public key stored on AWS; private key is stored locally
  aws ec2 create-key-pair --key-name $keyname --query 'KeyMaterial' --output text > $keyname.pem
  sudo chmod 400 $keyname.pem

  # Store local copies of variable names
  echo "StackName=$stackname" | tee -a logs.log
  echo "KeyName=$keyname" | tee -a  logs.log
} || {
  echo "Error generating key pair"
  exit
}

echo """
============================================================================
              DEPLOY CLOUD FORMATION STACK (ANALYTICS SYSTEM)
============================================================================
"""
{
  aws cloudformation create-stack --stack-name $stackname --template-body file://./cloud_formation/${stackname}_template.json --parameters ParameterKey=KeyName,ParameterValue=$keyname
  
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

echo """
============================================================================
              QUERY FOR INSTANCES IP ADDRESSES (ANALYTICS SYSTEM)
============================================================================
"""

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

echo """
============================================================================
                              SET UP HADOOP
============================================================================
"""

# Network Set Up
for ip in ${HadoopPublicIPs[@]}
do
  echo "Network Setup for $ip"
  ssh -o StrictHostKeyChecking=no ubuntu@$ip -i $keyname.pem 'bash -s' < ./analytics_scripts/network_setup.sh ${HadoopPrivateIPs[@]}
done

# Generating and distributing keys
i=0
for ip in ${HadoopPublicIPs[@]}
do
  if [ $i -eq 0 ]
  then
    # SSH key generation for namenode
    echo "Generating ssh key for Node$i"
    ssh -o StrictHostKeyChecking=no ubuntu@$ip -i $keyname.pem 'bash -s' < ./analytics_scripts/key_generation.sh 
    sleep 1
  else
    # Copy the generated keys from namenode to every datanode
    echo "Distributing ssh key to Node$i"
    ssh -o StrictHostKeyChecking=no ubuntu@$Node0PublicIP -i $keyname.pem "sudo cat /home/hadoop/.ssh/id_rsa.pub" \
    | ssh -o StrictHostKeyChecking=no ubuntu@$ip -i $keyname.pem "sudo cat - | sudo tee -a /home/hadoop/.ssh/authorized_keys"
    sleep 1
    echo "Finished copying keys to datanodes"
  fi
  i=$((i+1))
done

# Hadoop Setup
i=0
for ip in ${HadoopPublicIPs[@]}
do
  echo "Hadoop Setup for Node$i"
  if [ $i -eq 0 ]
  then
    ssh -o StrictHostKeyChecking=no ubuntu@$ip -i $keyname.pem 'bash -s' < ./analytics_scripts/hadoop_namenode_setup.sh ${HadoopPrivateIPs[@]} 
    sleep 1
  else
    ssh -o StrictHostKeyChecking=no ubuntu@$ip -i $keyname.pem 'bash -s' < ./analytics_scripts/hadoop_datanode_setup.sh
    sleep 1
  fi
  i=$((i+1))
done

# Hardcoded for now
MongoDBIP=34.207.119.124
MySQLIP=52.73.249.157
ssh -o StrictHostKeyChecking=no ubuntu@${HadoopPublicIPs[0]} -i $keyname.pem "MongoDBIP='$MongoDBIP' MySQLIP='$MySQLIP' bash -s" < ./analytics_scripts/init_hadoop_and_spark.sh

echo """
============================================================================
                                    DONE
============================================================================
"""