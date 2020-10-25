# Information on Preprocessing

Download the original kaggle dataset: https://istd50043.s3-ap-southeast-1.amazonaws.com/kindle-reviews.zip

Run `clean.py`. It takes in `kindle_reviews.csv` and outputs `kaggle_processed.csv`. The transformation splits the `'helpful'` column into `'likes'` and `'dislikes'`, both of which stores `INT`.

An example value of the `'helpful'` column is `'[2,3]'`. This breaks 1NF of our table, as presence of tuple values is a violation.

## Transformation

**Before**

`['Unnamed: 0', 'asin', 'helpful', 'overall', 'reviewText', 'reviewTime', 'reviewerID', 'reviewerName', 'summary', 'unixReviewTime']`

**After**

`['reviewID', 'asin', 'overall', 'reviewText', 'reviewTime', 'reviewerID', 'reviewerName', 'summary', 'unixReviewTime', 'likes', 'dislikes']`

**Additional Changes**

- Assigned the name `'reviewID'` to `'Unnamed: 0'`.
- Changed separation from `,` to `\t`. File is actually tab-delimited now.
- Incremented all `reviewID` by 1 to avoid conflicts with `AUTO-INCREMENT` resequencing.
