# Instruction for loading data into MySQL



**Download the pre-processed data** (See below for more information on the transformation applied)

```bash
sudo apt install python3-pip
pip3 install gdown
gdown https://drive.google.com/uc?id=1XJfUjcgmlvybIpCcWDtl9EPxoTDdx7bm
```

This downloads the pre-processed file `'kaggle_processed.csv'` into your system.



**Enter into mysql, then enter (use) a database (create one if you have not)**.

```mysql
USE readmeproj;
```



**Table Creation**

Calling the table `Kindle`

```mysql
CREATE TABLE `Kindle` (
  `reviewID` int(11) NOT NULL primary key,
  `asin` tinytext NOT NULL,
  `overall` int(1) DEFAULT NULL,
  `reviewText` text DEFAULT NULL,
  `reviewTime` date DEFAULT NULL,
  `reviewerID` tinytext DEFAULT NULL,
  `reviewerName` tinytext DEFAULT NULL,
  `summary` text DEFAULT NULL,
  `unixReviewTime` int(11) DEFAULT NULL,
  `likes` int(5) DEFAULT NULL,
  `dislikes` int(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
```



**Loading of preprocessed data `kaggle_processed.csv**

```mysql
LOAD DATA LOCAL INFILE 'kaggle_processed.csv' 
INTO TABLE Kindle
FIELDS TERMINATED BY '\t' ENCLOSED BY '"' ESCAPED BY ''
LINES TERMINATED BY '\n' 
IGNORE 1 ROWS
(reviewID, asin, overall, reviewText, @reviewTime, reviewerID, reviewerName, summary, unixReviewTime, likes, dislikes) SET reviewTime = STR_TO_DATE(@reviewTime, '%m %d, %Y');
```





# Information on Preprocessing



Original kaggle dataset from here: https://istd50043.s3-ap-southeast-1.amazonaws.com/kindle-reviews.zip



Run the clean.py (requires `pandas` library). It looks for `'kindle_reviews.csv'` and outputs `'kaggle_processed.csv'`.



## Transformation

**Before**

`['Unnamed: 0', 'asin', 'helpful', 'overall', 'reviewText', 'reviewTime', 'reviewerID', 'reviewerName', 'summary', 'unixReviewTime']`

**After**

`['reviewID', 'asin', 'overall', 'reviewText', 'reviewTime', 'reviewerID', 'reviewerName', 'summary', 'unixReviewTime', 'likes', 'dislikes']`

**Explanation**

Split the `'helpful'` column into `'likes'` and `'dislikes'`, both of which stores `INT`.

An example value of the `'helpful'` column is `'[2,3]'`. This breaks 1NF of our table, as presence of tuple values is a violation. 

**Additional Changes**

- Assigned the name `'reviewID'` to `'Unnamed: 0'`.
- Changed separation from `,` to `\t`. File is actually tab-delimited now.

