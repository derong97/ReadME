#!/bin/bash

ssh ubuntu@<ip-address> -i <path-to-key>

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
# Note you may encounter erros in gdown. If so try 'sudo reboot'. Then wait 2-3 minutes.
gdown https://drive.google.com/uc?id=1DKvMbHbUNJLE0rak2sQWafPeCtxsmwsp
gdown https://drive.google.com/uc?id=15yGajHZKapMv3W_lNruOY0TwC4WLWslg

mysql -u root < ini_Kindle.sql