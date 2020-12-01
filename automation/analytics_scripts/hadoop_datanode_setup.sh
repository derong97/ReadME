#!/bin/bash

sudo su - hadoop
echo "Entered as hadoop user"

sudo apt-get update
sudo apt-get install -y openjdk-8-jdk
echo "Installed Java"

tar zxvf hadoop-3.3.0.tgz
sudo mv hadoop-3.3.0 /opt/

sudo mkdir -p /mnt/hadoop/datanode/
sleep 1

sudo chown -R hadoop:hadoop /mnt/hadoop/datanode/
sleep 1

cd ~/download
wget https://apachemirror.sg.wuchna.com/sqoop/1.4.7/sqoop-1.4.7.bin__hadoop-2.6.0.tar.gz

tar zxvf sqoop-1.4.7.bin__hadoop-2.6.0.tar.gz

cp sqoop-1.4.7.bin__hadoop-2.6.0/conf/sqoop-env-template.sh \
sqoop-1.4.7.bin__hadoop-2.6.0/conf/sqoop-env.sh

sleep 1

export HD="\/opt\/hadoop-3.3.0"

sed -i "s/#export HADOOP_COMMON_HOME=.*/export HADOOP_COMMON_HOME=${HD}/g" \ sqoop-1.4.7.bin__hadoop-2.6.0/conf/sqoop-env.sh
sleep 1

sed -i "s/#export HADOOP_MAPRED_HOME=.*/export HADOOP_MAPRED_HOME=${HD}/g" \ sqoop-1.4.7.bin__hadoop-2.6.0/conf/sqoop-env.sh
sleep 1

wget https://repo1.maven.org/maven2/commons-lang/commons-lang/2.6/commons-lang-2.6.jar

cp commons-lang-2.6.jar sqoop-1.4.7.bin__hadoop-2.6.0/lib/
sleep 1

sudo cp -rf sqoop-1.4.7.bin__hadoop-2.6.0 /opt/sqoop-1.4.7
sleep 1

sudo apt install libmysql-java

sudo ln -snvf /usr/share/java/mysql-connector-java.jar \
/opt/sqoop-1.4.7/lib/mysql-connector-java.jar

echo "Setup sqoop completed on datanode"