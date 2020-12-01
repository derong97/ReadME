#!/bin/bash
# $1 name node private ip, $2 datanode1 private ip, ...

touch ips.txt

i=0;
for ip in "$@"
do
	if [ $i -eq 0 ]
	then 
		echo "$ip namenode" | sudo tee -a ips.txt;
	else
		echo "$ip datanode$i" | sudo tee -a ips.txt;
	fi
	i=$((i+1));
done

sudo su - hadoop
echo "Entered as hadoop user"

sudo apt-get update
sudo apt-get install -y openjdk-8-jdk
echo "Installed Java"

cd
mkdir download
cd download

wget https://apachemirror.sg.wuchna.com/hadoop/common/hadoop-3.3.0/hadoop-3.3.0.tar.gz
sleep 1

cd ./download
tar zxvf hadoop-3.3.0.tar.gz
sleep 1

echo "Updating JAVA_HOME"
export JH="\/usr\/lib\/jvm\/java-8-openjdk-amd64"

sed -i "s/# export JAVA_HOME=.*/export\ JAVA_HOME=${JH}/g" hadoop-3.3.0/etc/hadoop/hadoop-env.sh
sleep 1

i=0;
WORKERS=""
while read line;
do
	if [ $i -eq 0 ]
	then
		MASTER=namenode;
	else
		if [ $i -eq 1 ]
		then
			WORKERS+="datanode$i"
		else
			WORKERS+=" datanode$i"
		fi
	fi
	i=$((i+1));
done < /home/ubuntu/ips.txt

sleep 1

echo "Configuring Hadoop in our cluster..."

# configure core-site.xml
echo -e "<?xml version=\"1.0\"?>
<?xml-stylesheet type=\"text/xsl\" href=\"configuration.xsl\"?>
<\x21-- Put site-specific property overrides in this file. -->
<configuration>
<property>
<name>fs.defaultFS</name>
<value>hdfs://${MASTER}:9000</value>
</property>
</configuration>
" > hadoop-3.3.0/etc/hadoop/core-site.xml

# configure hdfs-site.xml
echo -e "<?xml version=\"1.0\"?>
<?xml-stylesheet type=\"text/xsl\" href=\"configuration.xsl\"?>
<\x21-- Put site-specific property overrides in this file. -->
<configuration>
<property>
<name>dfs.replication</name>
<value>3</value>
</property>
<property>
<name>dfs.namenode.name.dir</name>
<value>file:/mnt/hadoop/namenode</value>
</property>
<property>
<name>dfs.datanode.data.dir</name>
<value>file:/mnt/hadoop/datanode</value>
</property>
</configuration>
" > hadoop-3.3.0/etc/hadoop/hdfs-site.xml

# configure yarn-site.xml
echo -e "<?xml version=\"1.0\"?>
<?xml-stylesheet type=\"text/xsl\" href=\"configuration.xsl\"?>
<\x21-- Put site-specific property overrides in this file. -->
<configuration>
<\x21-- Site specific YARN configuration properties -->
<property>
<name>yarn.nodemanager.aux-services</name>
<value>mapreduce_shuffle</value>
<description>Tell NodeManagers that there will be an auxiliary
service called mapreduce.shuffle
that they need to implement
</description>
</property>
<property>
<name>yarn.nodemanager.aux-services.mapreduce_shuffle.class</name>
<value>org.apache.hadoop.mapred.ShuffleHandler</value>
<description>A class name as a means to implement the service
</description>
</property>
<property>
<name>yarn.resourcemanager.hostname</name>
<value>${MASTER}</value>
</property>
</configuration>
" > hadoop-3.3.0/etc/hadoop/yarn-site.xml

# configure mapred-site.xml
echo -e "<?xml version=\"1.0\"?>
<?xml-stylesheet type=\"text/xsl\" href=\"configuration.xsl\"?>
<\x21-- Put site-specific property overrides in this file. -->
<configuration>
<\x21-- Site specific YARN configuration properties -->
<property>
<name>mapreduce.framework.name</name>
<value>yarn</value>
<description>Use yarn to tell MapReduce that it will run as a YARN application
</description>
</property>
<property>
<name>yarn.app.mapreduce.am.env</name>
<value>HADOOP_MAPRED_HOME=/opt/hadoop-3.3.0/</value>
</property>
<property>
<name>mapreduce.map.env</name>
<value>HADOOP_MAPRED_HOME=/opt/hadoop-3.3.0/</value>
</property>
<property>
<name>mapreduce.reduce.env</name>
<value>HADOOP_MAPRED_HOME=/opt/hadoop-3.3.0/</value>
</property>
</configuration>
" > hadoop-3.3.0/etc/hadoop/mapred-site.xml

sleep 1

rm hadoop-3.3.0/etc/hadoop/workers
for ip in ${WORKERS}; do
    echo -e "${ip}" >> hadoop-3.3.0/etc/hadoop/workers;
done

sleep 1

echo "Hadoop configuration completed"

echo "Installing Hadoop on namenode..."
tar czvf hadoop-3.3.0.tgz hadoop-3.3.0
sleep 1

for h in $WORKERS ; do
    scp -o StrictHostKeyChecking=no hadoop-3.3.0.tgz $h:.;
done;
echo "Sent files to datanodes"

cp hadoop-3.3.0.tgz ~/
cd

tar zxvf hadoop-3.3.0.tgz
sudo mv hadoop-3.3.0 /opt/
sleep 1

sudo mkdir -p /mnt/hadoop/namenode/hadoop-${USER}
sudo chown -R hadoop:hadoop /mnt/hadoop/namenode
yes | /opt/hadoop-3.3.0/bin/hdfs namenode -format

echo "Installation of Hadoop on namenode completed"

echo "Setting up sqoop..."

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

echo "Setup sqoop completed on namenode"

exit

rm ips.txt