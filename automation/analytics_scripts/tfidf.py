import sys
import pyspark
import math
from pyspark.sql import SparkSession
from pyspark.sql import functions as F

########################## INFORMATION ###########################
# This file is hosted in Dropbox. If automation script fails to extract this, means it have been taken done. So just retrieve it from here instead.

########################## HOW TO RUN ############################
# /opt/spark-3.0.1-bin-hadoop3.2/bin/spark-submit --master spark://<master-ip>:7077 tfidf.py <master-private-ip>
# /opt/spark-3.0.1-bin-hadoop3.2/bin/spark-submit --master spark://ec2-54-169-135-228.ap-southeast-1.compute.amazonaws.com:7077 tfidf.py ec2-54-169-135-228.ap-southeast-1.compute.amazonaws.com

########################### VARIABLES ############################

MASTER = sys.argv[1]
REVIEWS_FILE = "kindle_reviews.tsv"
METADATA_FILE = "kindle_meta.json"
RESULT_OUTPUT_DIR = "tfidf"

########################### INIT SPARK ###########################

sc = pyspark.SparkContext(master="spark://{}:7077".format(MASTER), appName="tfidf")
spark = SparkSession(sc)

####################### LOAD REVIEWS (SQL) #######################

data = spark.read\
            .option("header", "true")\
            .option("inferScheme", "true")\
            .csv("hdfs://{}:9000/data/{}".format(MASTER, REVIEWS_FILE), header=True, sep="\t")

########################### ANALYTICS ############################

# drop rows with null values in reviews
data = data.filter(F.col("reviewText").isNotNull())
data = data.select(F.col("asin"),F.col("reviewerID"), F.col("reviewText"))

# number of documents
n = data.count()

rdd = data.rdd

## computing tf
# get key value pair of (asin, reviewerId, word i) and number of word i that appears in the review
# asin and reviewerId is  the document ID
data = rdd.flatMap(lambda row: [(((row[0],row[1]),i),1) for i in row[2].split()])
data = data.reduceByKey(lambda x,y:x+y)

# modify key value pairs into (token, (documentID, tf)
tf = data.map(lambda x: (x[0][1],(x[0][0],x[1])))

## computing idf
data = tf.map(lambda x: (x[0], 1))
data = data.reduceByKey(lambda x,y:x+y)

idf = data.map(lambda x: (x[0], math.log10(n/x[1])))

# join rdd for tf and idf
rdd = tf.join(idf)

## compute tfidf
# key value pair is (documentID, (token, tfidf))
tfidf = rdd.map(lambda x: (x[1][0][0], (x[0], x[1][0][1]*x[1][1])))

print(tfidf.take(5))

tfidf.saveAsTextFile("hdfs://{}:9000/{}".format(MASTER, RESULT_OUTPUT_DIR))

sc.stop()