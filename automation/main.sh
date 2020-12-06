#!/bin/bash

main(){
    sudo ./setup.sh
}

teardown(){
    sudo ./teardown.sh
}

analytics(){
    MongoDBIP=$(grep MongoDBIP logs.log | sed -e 's/.*MongoDBIP=\(\S*\).*/\1/g')
    MySQLIP=$(grep MySQLIP logs.log | sed -e 's/.*MySQLIP=\(\S*\).*/\1/g')
    Node0PublicIP=$(grep Node0PublicIP logs.log | sed -e 's/.*Node0PublicIP=\(\S*\).*/\1/g')
    KeyName=$(grep KeyName logs.log | sed -e 's/.*KeyName=\(\S*\).*/\1/g')

    sudo ssh -o StrictHostKeyChecking=no ubuntu@$Node0PublicIP -i $KeyName.pem "MongoDBIP='$MongoDBIP' MySQLIP='$MySQLIP' bash -s" < ./analytics_scripts/ingest_data.sh
    sudo ssh -o StrictHostKeyChecking=no ubuntu@$Node0PublicIP -i $KeyName.pem 'bash -s' < ./analytics_scripts/execute_analytics.sh
}

scaleup(){
    Node0PublicIP=$(grep Node0PublicIP logs.log | sed -e 's/.*Node0PublicIP=\(\S*\).*/\1/g')
    KeyName=$(grep KeyName logs.log | sed -e 's/.*KeyName=\(\S*\).*/\1/g')

    read -p "Private IP address of datanode to be added:" datanode
    sudo ssh ubuntu@$Node0PublicIP -i $KeyName.pem 'bash -s' < ./analytics_scripts/scaling_up.sh $datanode
}

scaledown(){
    Node0PublicIP=$(grep Node0PublicIP logs.log | sed -e 's/.*Node0PublicIP=\(\S*\).*/\1/g')
    KeyName=$(grep KeyName logs.log | sed -e 's/.*KeyName=\(\S*\).*/\1/g')

    read -p "Private IP address of datanode to be removed:" datanode
    sudo ssh ubuntu@$Node0PublicIP -i $KeyName.pem 'bash -s' < ./analytics_scripts/scaling_down.sh $datanode
}

print_usage(){
    echo """
    -s : Setting up production and analytics system
    -t : Tearing down production and analytics system
    -a : Ingesting data and running analytics
    -h : Print command usage
    -u : Scaling up requested node in hadoop cluster
    -d : Scaling down requested node in hadoop cluster
    """
}

while getopts ":stahud" opt; do
  case $opt in
    s)
        echo "Setting up production and analytics system"
        main
        exit
        ;;
    t)
        echo "Tearing down production and analytics system"
        teardown
        exit
        ;;
    a)
        echo "Ingesting data and running analytics"
        analytics
        exit
        ;;
    h)
        print_usage
        exit
        ;;
    u)
        echo "Scaling up requested node in hadoop cluster"
        scaleup
        exit
        ;;
    d)
        echo "Scaling down requested node in hadoop cluster"
        scaledown
        exit
        ;;
    \?)
        echo "Unknown Command, use -h for help"
        exit
        ;;
  esac
done