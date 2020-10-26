CREATE database IF NOT EXISTS readme_sql;
USE readme_sql;

DROP TABLE IF EXISTS `Kindle`;

CREATE TABLE `Kindle` (
  `asin` VARCHAR(100) NOT NULL,
  `overall` int(1) NOT NULL,
  `reviewText` text NOT NULL,
  `reviewTime` date NOT NULL,
  `reviewerID` VARCHAR(255) NOT NULL,
  `reviewerName` tinytext NOT NULL,
  `summary` text NOT NULL,
  `unixReviewTime` int(11) NOT NULL,
  `likes` int(5) NOT NULL DEFAULT '0',
  `dislikes` int(5) NOT NULL DEFAULT '0',
  PRIMARY KEY (`asin`, `reviewerID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOAD DATA LOCAL INFILE 'kaggle_processed.csv' 
INTO TABLE Kindle
FIELDS TERMINATED BY '\t' ENCLOSED BY '"' ESCAPED BY ''
LINES TERMINATED BY '\n' 
IGNORE 1 ROWS
(asin, overall, reviewText, @reviewTime, reviewerID, reviewerName, summary, unixReviewTime, likes, dislikes) 
SET reviewTime = STR_TO_DATE(@reviewTime, '%m %d, %Y');