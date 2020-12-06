# Information on Preprocessing

Original kaggle dataset is downloaded from: https://istd50043.s3-ap-southeast-1.amazonaws.com/kindle-reviews.zip
Name it to `kindle_reviews.csv`.

Run `clean.py`. It takes in `kindle_reviews.csv` and outputs `kaggle_processed.csv`. 

## Transformation

**Before**

`['Unnamed: 0', 'asin', 'helpful', 'overall', 'reviewText', 'reviewTime', 'reviewerID', 'reviewerName', 'summary', 'unixReviewTime']`

**After**

`['asin', 'overall', 'reviewText', 'reviewTime', 'reviewerID', 'reviewerName', 'summary', 'unixReviewTime', 'likes', 'dislikes']`

**Additional Changes**

- Splits the `'helpful'` column into two: `'likes'` and `'dislikes'`. Both stores type `INT`.
    - `'[2,3]'` is transformed into `2`, `3`. Thus fulfilling 1NF.
- Deleted `'Unnamed: 0'`, which is `'reviewID'`. We have no use for it because:
- Primary key of `Kindle` table in MySQL is composite of `'asin'` and `'reviewerID'`.
- Changed separation from `,` to `\t`. File is actually tab-delimited now.
- Incremented all `reviewID` by 1 to avoid conflicts with `AUTO-INCREMENT` resequencing.
