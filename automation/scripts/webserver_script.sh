#!/bin/bash

sudo apt-get update

export LC_ALL="en_US.UTF-8"
export LANGUAGE="en_US.UTF-8"

sudo apt-get -y install npm
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt-get install -y nodejs

sudo apt update
sudo apt install python3 -y
sudo apt-get install python3-venv -y
python3 --version

echo "mysql-server mysql-server/root_password password password" | sudo debconf-set-selections
echo "mysql-server mysql-server/root_password_again password password" | sudo debconf-set-selections
sudo apt-get install mysql-server -y
sudo apt-get install libmysqlclient-dev -y

sudo apt install python3-pip -y
sudo apt-get update

wget -c https://www.dropbox.com/s/5dyewe9mipo7k2r/ReadMe-main.zip?dl=0 -O ReadMe-main.zip
sudo apt install unzip
unzip ReadMe-main.zip

cd ReadMe-main/server
python3 -m venv venv
source venv/bin/activate

pip3 install wheel
pip3 install gunicorn
pip3 install -r requirements.txt

sudo tee .env << EOF
MONGO_IP=$MongoDBIP
MONGO_USER=historicriptide
MONGO_PW=futuresparkles
MONGO_DB=readme_mongo
MONGO_USERS_COL=userbase
MONGO_METADATA_COL=kindle_metadata
MONGO_LOG_COL=log

SQL_IP=$MySQLIP
SQL_USER=historicriptide
SQL_PW=futuresparkles
SQL_DB=readme_sql
SQL_KINDLE=Kindle

SECRET_KEY=706c656173652067656e657261746520612072616e646f6d206e756d626572
EOF

cd ../frontend/static
npm install

cd ../../server
echo "Webserver SetUp complete"
echo "You can visit your website now at $WebServerIP:5000"

#flask run --host=0.0.0.0
gunicorn -b :5000 app:app