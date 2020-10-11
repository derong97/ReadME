# Instruction for loading data into MySQL



**Download the pre-processed data** (See below for more information on the transformation applied)

```bash
sudo apt install python3-pip
pip3 install gdown
gdown https://drive.google.com/uc?id=1lgrBw_XDaKjlN5fFfF47P8l9Dhm8IRME
```

This downloads the pre-processed file `'kaggle_processed.csv'` into your system.



**Enter into MySQL, then enter (use) a database (create one if you have not)**.

```mysql
USE readmeproj;
```



**Table Creation**

Calling the table `Kindle`

```mysql
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
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
```



**Loading of pre-processed data `kaggle_processed.csv`**

```mysql
LOAD DATA LOCAL INFILE 'kaggle_processed.csv' 
INTO TABLE Kindle
FIELDS TERMINATED BY '\t' ENCLOSED BY '"' ESCAPED BY ''
LINES TERMINATED BY '\n' 
IGNORE 1 ROWS
(reviewID, asin, overall, reviewText, @reviewTime, reviewerID, reviewerName, summary, unixReviewTime, likes, dislikes) SET reviewTime = STR_TO_DATE(@reviewTime, '%m %d, %Y');
```





# Additional Stuff



## Inserting Data



```mysql
INSERT INTO Kindle(asin, overall, reviewText, reviewTime, reviewerID, reviewerName, summary, unixReviewTime) 
values ("test_asin", 5, "test_reviewText", curdate(), "test_reviewerID", "test_reviewerName", "test_summary", UNIX_TIMESTAMP());
```

As we `AUTO_INCREMENT` the attribute `reviewID`, there's no need to assign it a value in our `INSERT` operation. It will take the value of the biggest existing `reviewID` and plus `1`.



## Inspecting your Insertion



To inspect the new entry you added earlier (which is at the bottom of `Kindle`):

```mysql
SELECT * FROM Kindle
ORDER BY reviewID DESC
LIMIT 10;
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

