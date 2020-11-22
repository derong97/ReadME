#!/bin/bash

# You have to enable inbound rule for remote connection!

sudo apt-get update

export DEBIAN_FRONTEND=noninteractive
sudo -E apt-get -q -y install mysql-server

sudo mysql -e 'update mysql.user set plugin = "mysql_native_password" where user="root"'
sudo mysql -e 'grant all privileges on *.* to "root"@"localhost" with grant option'

# Set up remote connection admin account. Username is historicriptide. Password is futuresparkles. 
sudo mysql -e "CREATE USER 'historicriptide'@'%' IDENTIFIED BY 'futuresparkles'"
sudo mysql -e 'update mysql.user set plugin = "mysql_native_password" where user="historicriptide"'
sudo mysql -e 'grant all privileges on *.* to "historicriptide"@"%" with grant option'
sudo mysql -e 'flush privileges'

sudo sh -c 'echo "[mysqld]\nbind-address = 0.0.0.0" >> /etc/mysql/my.cnf'
sudo service mysql restart

wget https://www.dropbox.com/s/pci2vmsr8f4uew2/ini_Kindle.sql?dl=0 -O ini_Kindle.sql 
wget https://www.dropbox.com/s/e9xjq9q55oppsvc/kaggle_processed.csv?dl=0 -O kaggle_processed.csv

echo "Loading data into MySQL... This takes roughly a minute!"
mysql -u root < ini_Kindle.sql

echo "MySQL SetUp complete"