#!/bin/bash

# Get metadata
wget -c https://istd50043.s3-ap-southeast-1.amazonaws.com/meta_kindle_store.zip -O meta_kindle_store.zip
unzip meta_kindle_store.zip

# Clean up
rm -rf *.zip

# Load metadata to localhost MongoDB
mongoimport -d readme_mongo -c kindle_metadata --file meta_Kindle_Store.json