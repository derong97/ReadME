import math
import sys
import pyspark
from pyspark.sql.functions import *
from pyspark.sql.functions import length
from pyspark.sql import SparkSession
from pyspark import SparkContext
from pyspark.sql import functions as F
from pyspark.sql.types import DoubleType

# to run
# /opt/spark-3.0.1-bin-hadoop3.2/bin/spark-submit --master spark://<master-ip>:7077 correlation.py <master-private-ip>
# /opt/spark-3.0.1-bin-hadoop3.2/bin/spark-submit --master spark://ec2-54-169-135-228.ap-southeast-1.compute.amazonaws.com:7077 correlation.py ec2-54-169-135-228.ap-southeast-1.compute.amazonaws.com

MASTER = sys.argv[1]
REVIEWS_FILE = "kindle_reviews.csv"
METADATA_FILE = "kindle_meta.json"
RESULT_OUTPUT_DIR = "corr"

########################### INIT SPARK ###########################

sc = pyspark.SparkContext(master="spark://{}:7077".format(MASTER), appName="correlation")
spark = SparkSession(sc)

####################### LOAD REVIEWS (SQL) #######################

df_reviews = spark.read\
            .option("header", "true")\
            .option("inferScheme", "true")\
            .csv("hdfs://{}:9000/data/{}".format(MASTER, REVIEWS_FILE), header=True, sep=",")

##################### LOAD METADATA (MONGO) ######################

df_metadata = spark.read\
	        .option("inferSchema", "true")\
            .json("hdfs://{}:9000/data/{}".format(MASTER, METADATA_FILE))
df_metadata = df_metadata.withColumn("price", df_metadata["price"].cast(DoubleType()))

######################## PREP DATAFRAME ##########################

# Get average length of review, and prices
reviews = df_reviews.select(F.col("asin"), F.col("reviewText"))
reviews = reviews.withColumn("reviewTextLength", length("reviewText"))
reviews = reviews.select(F.col("asin"), F.col("reviewTextLength"))
reviews = reviews.groupBy("asin").avg().select(F.col("asin"),F.col("avg(reviewTextLength)").alias("avg_len"))
prices = df_metadata.select(F.col("asin"), F.col("price"))

# Create new 'df' - join tables and remove rows with None values
df = reviews.join(prices, reviews["asin"] == prices["asin"])
df = df.select(F.col("price"), F.col("avg_len"))
df = df.filter(F.col("price").isNotNull())
df = df.filter(F.col("avg_len").isNotNull())

########################### ANALYTICS ############################

n = df.count()

# get the values for x, y, x^2, y^2 and xy to put in the formula
rdd = df.rdd
data = rdd.flatMap(lambda row: (    ("x", row[0]), 
                                    ("y", row[1]),
								    ("x2", row[0]**2), 
                                    ("y2", row[1]**2),
								    ("xy", row[0]*row[1])
                                )
                    )
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

############################# OUTPUT #############################

# Saving results to HDFS
output = sc.parallelize(['Correlation', r])
output.saveAsTextFile("hdfs://{}:9000/{}".format(MASTER, RESULT_OUTPUT_DIR))

# Printing to console
print("Pearson correlation = ", r)
