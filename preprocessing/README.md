# Preprocessing steps

1. Webscraping for titles **[Extra effort]**

- The provided `meta_kindle_store.json` file does not come with titles for many books.
- We then affix titles to the metadata json file, which we load to MongoDB. This expands the search area for the frontend as more books have titles now.

2. To increase performance of sorting by rating, we preprocessed the average ratings of each book from the SQL kindle data and affix them to the metadata json file.

- This reduces the query time by the client as this data is already stored on MongoDB, saving the time needed to aggregate all the results from SQL each time.
