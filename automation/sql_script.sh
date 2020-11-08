#!/bin/bash

# IMPORTANT: FOLLOW THESE INSTRUCTIONS FIRST.
# 1. Launch a distinct EC2 instance from the course provided AMI. Note that you have 2 instances, one for MySQL, and the other for MongoDB
# 2. Allow global IP inbound connection on MySQL port through EC2 dashboard (wizard)
# 3. SSH in (ssh ubuntu@<ip-address> -i <path-to-key>)and run the following lines:

sudo apt-get update
# Simply leave field empty on prompts (purple screen), if they appear.
sudo apt install mysql-server -y

# Set up localhost root account (only accessible when you SSH in (i.e. non-remote connection).
sudo mysql -e 'update mysql.user set plugin = "mysql_native_password" where user="root"'
sudo mysql -e 'grant all privileges on *.* to "root"@"localhost" with grant option'

# Set up remote connection admin account. Username is historicriptide. Password is futuresparkles. 
sudo mysql -e "CREATE USER 'historicriptide'@'%' IDENTIFIED BY 'futuresparkles'"
sudo mysql -e 'update mysql.user set plugin = "mysql_native_password" where user="historicriptide"'
sudo mysql -e 'grant all privileges on *.* to "historicriptide"@"%" with grant option'
sudo mysql -e 'flush privileges'

sudo sh -c 'echo "[mysqld]\nbind-address = 0.0.0.0" >> /etc/mysql/my.cnf'
sudo service mysql restart

sudo apt install python3-pip -y
pip3 install gdown
# Note you may encounter errors in gdown. If so try 'sudo reboot'. Then wait 2-3 minutes.
gdown https://drive.google.com/uc?id=1DKvMbHbUNJLE0rak2sQWafPeCtxsmwsp
gdown https://drive.google.com/uc?id=15yGajHZKapMv3W_lNruOY0TwC4WLWslg

mysql -u root < ini_Kindle.sql