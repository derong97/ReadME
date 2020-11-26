echo "Setting up WebServer"

sudo apt-get update
sudo apt-get -y install npm
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt-get install -y nodejs

sudo apt install software-properties-common 
sudo add-apt-repository ppa:deadsnakes/ppa 
sudo apt install python3.7 -y
sudo apt-get install python3.7-venv -y
sudo apt-get update
sudo apt-get install mysql-server -y
sudo apt-get install libmysqlclient-dev -y
sudo apt install python3-pip -y

export LC_ALL="en_US.UTF-8"
export LANGUAGE="en_US.UTF-8"

pip3 --version
pip3 install gdown
gdown --version
# gdown https://drive.google.com/uc?id=1OmelBxPrCpBIaF4hLDuhNHR66NET43S6

# sudo apt install unzip
# unzip ReadMe.zip

# cd ReadMe/server
# python3.7 -m venv venv
# source venv/bin/activate
# pip3 install wheel
# sudo apt-get update
# sudo apt-get install python3.7-dev -y
# pip3 install -r requirements.txt
# sudo tee .env << EOF
# MONGO_IP=204.236.223.217
# MONGO_USER=historicriptide
# MONGO_PW=futuresparkles
# MONGO_DB=readme_mongo
# MONGO_USERS_COL=userbase
# MONGO_METADATA_COL=kindle_metadata
# MONGO_LOG_COL=log

# SQL_IP=52.73.249.157
# SQL_USER=historicriptide
# SQL_PW=futuresparkles
# SQL_DB=readme_sql
# SQL_KINDLE=Kindle

# SECRET_KEY=706c656173652067656e657261746520612072616e646f6d206e756d626572
# EOF

# cd ../frontend
# npm install
# npm run build

# cd ../server
# flask run --host=0.0.0.0