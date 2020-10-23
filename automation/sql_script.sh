#!/bin/bash

ssh ubuntu@<ip-address> -i <path-to-key>

sudo apt install mysql-server -y

sudo mysql -e 'update mysql.user set plugin = "mysql_native_password" where user="root"'
sudo mysql -e 'create user "root"@"%" identified by ""'
sudo mysql -e 'grant all privileges on *.* to "root"@"%" with grant option'
sudo mysql -e 'flush privileges'

sudo sh -c 'echo "[mysqld]\nbind-address = 0.0.0.0" >> /etc/mysql/my.cnf'
sudo service mysql restart

sudo apt-get update
sudo apt install python3-pip -y
pip3 install gdown
gdown https://drive.google.com/uc?id=1lgrBw_XDaKjlN5fFfF47P8l9Dhm8IRME
gdown https://drive.google.com/uc?id=18zKSytgjy56nNRP8z2IsxTVga1jGSiqZ

mysql -u root
create database if not exists readme_sql;
quit

mysql -u root readme_sql < ini_Kindle.sql