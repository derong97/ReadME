#!/bin/bash

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

wget https://storage.googleapis.com/readme-db-proj/kaggle_processed.csv -O kaggle_processed.csv
sleep 3s

echo "Loading data into MySQL... This takes roughly a minute!"
mysql -u root << EOF
CREATE database IF NOT EXISTS readme_sql;
USE readme_sql;
DROP TABLE IF EXISTS Kindle;

CREATE TABLE Kindle (
  asin VARCHAR(100) NOT NULL,
  overall int(1) NOT NULL,
  reviewText text NOT NULL,
  reviewTime date NOT NULL,
  reviewerID VARCHAR(255) NOT NULL,
  reviewerName tinytext NOT NULL,
  summary text NOT NULL,
  unixReviewTime int(11) NOT NULL,
  likes int(5) NOT NULL DEFAULT '0',
  dislikes int(5) NOT NULL DEFAULT '0',
  PRIMARY KEY (asin, reviewerID)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOAD DATA LOCAL INFILE 'kaggle_processed.csv' 
INTO TABLE Kindle
FIELDS TERMINATED BY '\t' ENCLOSED BY '"' ESCAPED BY ''
LINES TERMINATED BY '\n' 
IGNORE 1 ROWS
(asin, overall, reviewText, @reviewTime, reviewerID, reviewerName, summary, unixReviewTime, likes, dislikes) 
SET reviewTime = STR_TO_DATE(@reviewTime, '%m %d, %Y');
EOF

echo "MySQL SetUp complete"