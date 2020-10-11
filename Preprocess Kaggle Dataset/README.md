# Instructions for Preprocessing



Obtain the kaggle dataset from here: https://istd50043.s3-ap-southeast-1.amazonaws.com/kindle-reviews.zip



Run the clean.py (requires `pandas` library). It looks for `'kindle_reviews.csv'` and outputs `'kaggle_processed.csv'`.



## Transformation

**Before**

`['Unnamed: 0', 'asin', 'helpful', 'overall', 'reviewText', 'reviewTime', 'reviewerID', 'reviewerName', 'summary', 'unixReviewTime']`

**After**

`['reviewID', 'asin', 'overall', 'reviewText', 'reviewTime', 'reviewerID', 'reviewerName', 'summary', 'unixReviewTime', 'likes', 'dislikes']`

**Explanation**

Split the `'helpful'` column into `'likes'` and `'dislikes'`, both of which stores `INT`.

An example value of the `'helpful'` column is `'[2,3]'`. This breaks 1NF of our table, as presence of tuple values is a violation. 

Also assigned the name `'reviewID'` to `'Unnamed: 0'`.



# Instruction for loading data into MySQL



**First, enter a database (create one if you have not)**

```mysql
USE readmeproj;
```



**Table creation**

```mysql
CREATE TABLE `kindle` (
  `reviewID` int(11) NOT NULL,
  `asin` varchar(255) NOT NULL,
  `overall` int(11) DEFAULT NULL,
  `reviewText` varchar(25000) DEFAULT NULL,
  `reviewTime` varchar(25) DEFAULT NULL,
  `reviewerID` varchar(45) DEFAULT NULL,
  `reviewerName` varchar(255) DEFAULT NULL,
  `summary` varchar(500) DEFAULT NULL,
  `unixReviewTime` int(11) DEFAULT NULL,
  `likes` int(11) DEFAULT NULL,
  `dislikes` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
```



**Loading of preprocessed data `kaggle_processed.csv**

```mysql
LOAD DATA LOCAL INFILE 'kaggle_processed.csv' 
INTO TABLE kindle
FIELDS TERMINATED BY '\t' ENCLOSED BY '"' ESCAPED BY ''
LINES TERMINATED BY '\n' 
IGNORE 1 ROWS;
```





