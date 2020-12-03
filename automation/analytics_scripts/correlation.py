import math
import sys
import pyspark
from pyspark.sql.functions import *
from pyspark.sql.functions import length
from pyspark.sql import SparkSession
from pyspark import SparkContext
from pyspark.sql import functions as F

# to run
# $SPARK_HOME/bin/spark-submit --master spark://<master-ip>:7077 correlation.py <master-ip>
# $SPARK_HOME/bin/spark-submit --master spark://ec2-54-169-135-228.ap-southeast-1.compute.amazonaws.com:7077 correlation.py ec2-54-169-135-228.ap-southeast-1.compute.amazonaws.com

# MASTER=sys.argv[1]

# sc = pyspark.SparkContext("spark://{}:7077".format(MASTER), "correlation")
# spark = SparkSession(sc)

spark = SparkSession.builder.getOrCreate()
# sc = spark.SparkContext ## doesnt work??

# Load reviews

df = spark.read\
	.option("header", "true")\
	.option("inferScheme", "true")\
    .option("sep", "\t")\
	.csv("kaggle_processed.csv") # to replace with the sql data from hdfs

reviews = df.select(F.col("asin"), F.col("reviewText"))

# Get average length of review
reviews = reviews.withColumn("reviewTextLength", length("reviewText"))
reviews = reviews.select(F.col("asin"), F.col("reviewTextLength"))
reviews = reviews.groupBy("asin").avg().select(F.col("asin"),F.col("avg(reviewTextLength)").alias("avg_len"))


# Load metadata

df= spark.read\
	.option("inferSchema", "true")\
	.json("kindle_metadata_with_title_and_avgrating.json") # to replace with mongo data from hdfs

prices = df.select(F.col("asin"), F.col("price"))


# join tables and remove rows with None values
df = reviews.join(prices, reviews["asin"] == prices["asin"])
df = df.select(F.col("price"), F.col("avg_len"))
df = df.filter(F.col("price").isNotNull())
df = df.filter(F.col("avg_len").isNotNull())

n = df.count()

# get the values for x, y, x^2, y^2 and xy to put in the formula
rdd = df.rdd
data = rdd.flatMap(lambda row: (("x", row[0]), ("y", row[1]),
								("x2", row[0]**2), ("y2", row[1]**2),
								("xy", row[0]*row[1])))

summed_data = data.reduceByKey(lambda x,y: x+y)
summed_data = summed_data.sortByKey().take(5)

x = summed_data[0][1]
x2 = summed_data[1][1]
xy = summed_data[2][1]
y = summed_data[3][1]
y2 = summed_data[4][1]

num = (n*xy)-(x*y)
den = math.sqrt((n*x2-x**2)*(n*y2-y**2))
r = num / den
print("Pearson correlation = ",r)

# saving results to HDFS
# output = sc.parallelize(['Correlation', r])
# output.saveAsTextFile("hdfs://namenode:9000/corr")