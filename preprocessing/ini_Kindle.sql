CREATE DATABASE IF NOT EXISTS readme_sql;

DROP TABLE IF EXISTS `Kindle`;

CREATE TABLE `Kindle` (
  `reviewID` int(11) NOT NULL AUTO_INCREMENT,
  `asin` tinytext NOT NULL,
  `overall` int(1) NOT NULL,
  `reviewText` text NOT NULL,
  `reviewTime` date NOT NULL,
  `reviewerID` tinytext NOT NULL,
  `reviewerName` tinytext NOT NULL,
  `summary` text NOT NULL,
  `unixReviewTime` int(11) NOT NULL,
  `likes` int(5) NOT NULL DEFAULT '0',
  `dislikes` int(5) NOT NULL DEFAULT '0',
  PRIMARY KEY (`reviewID`)
);

LOAD DATA LOCAL INFILE 'kaggle_processed.csv' 
INTO TABLE Kindle
FIELDS TERMINATED BY '\t' ENCLOSED BY '"' ESCAPED BY ''
LINES TERMINATED BY '\n' 
IGNORE 1 ROWS
(reviewID, asin, overall, reviewText, @reviewTime, reviewerID, reviewerName, summary, unixReviewTime, likes, dislikes) 
SET reviewTime = STR_TO_DATE(@reviewTime, '%m %d, %Y');