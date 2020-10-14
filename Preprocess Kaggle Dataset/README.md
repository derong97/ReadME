# Instruction for loading data into MySQL



Last Updated 11 Oct 2020



**Download the necessary files** (See below for more information on the transformation applied)

```bash
sudo apt install python3-pip
pip3 install gdown
gdown https://drive.google.com/uc?id=1lgrBw_XDaKjlN5fFfF47P8l9Dhm8IRME
gdown https://drive.google.com/uc?id=18zKSytgjy56nNRP8z2IsxTVga1jGSiqZ
```

This downloads the following files into your system:

- `'kaggle_processed.csv'`, pre-processed Kindle reviews.

- `'ini_Kindle.csv'`, an SQL batch file for the creation of table and loading in `'kaggle_processed.csv'`.



**Inside Database "readme" (modify if necessary), create a table and load the data into MySQL**

```bash
mysql -u root readme < ini_Kindle.sql
```

Create a database first, e.g. `readme`.

If you have another database that you wish to create the table in, change `readme` to that name in the command above.

*Caution: The table `Kindle` inside your database will be dropped and overwritten with new data.*

You should not get any errors at all.



<br>



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



<br>



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

- Incremented all `reviewID` by 1 to avoid conflicts with `AUTO-INCREMENT` resequencing.