  
#!/bin/bash

# Download pip3, npm and nodejs
sudo apt-get update
# sudo apt-get install -y python3-pip
sudo apt install python3-pip
pip3 --version
sudo apt install python3


# Download code from github
# wget -c https://github.com/derong97/ReadMe.git-O 50043_isit_database.zip
curl -LJ0 https://github.com/derong97/ReadMe.git
# sudo apt install unzip
# unzip 50043_isit_database.zip

# Create virtualenv and install dependencies
cd ReadMe/server && python3 -m venv .pyenv
source venv/bin/activate
pip install -r requirements.txt
# touch log.txt
# python3 -m pip install -r requirements.txt
chmod +x app.py
# chmod a+rwx log.txt
curl -sL https://deb.nodesource.com/setup_10.x -o nodesource_setup.sh #another way of installing nodejs
sudo bash nodesource_setup.sh
sudo apt-get install nodejs
sudo apt-get install npm 
nodejs -v
npm -v


# Install node modules
cd ../frontend
npm install
npm run build

cd ../server 
touch .env
cp env_tempalate .env

LOCAL_PUBLIC_IP=$(curl ifconfig.co)
export LOCAL_PUBLIC_IP
echo $LOCAL_PUBLIC_IP
npx webpack --env.API_URL=http://$LOCAL_PUBLIC_IP:5000 --progress -p --mode=production --config webpack.config.js 