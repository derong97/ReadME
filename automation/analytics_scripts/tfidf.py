import sys
import pyspark
import numpy
from pyspark.sql import SparkSession
from pyspark.ml.feature import CountVectorizer, IDF, Tokenizer
from pyspark.sql.functions import udf, col

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
data = data.na.drop(subset=["reviewText"])

# convert to words
tokenizer = Tokenizer(inputCol="reviewText", outputCol="words")
wordsData = tokenizer.transform(data)

# use CountVectorizer to get term frequency vectors
cv = CountVectorizer(inputCol="words", outputCol="rawFeatures", vocabSize=20)
model = cv.fit(wordsData)
featurizedData = model.transform(wordsData)

vocab = model.vocabulary

# Applying IDF needs two passes:
# First to compute the IDF vector and second to scale the term frequencies by IDF.
idf = IDF(inputCol="rawFeatures", outputCol="features")
idfModel = idf.fit(featurizedData)
rescaledData = idfModel.transform(featurizedData)

# trying to map the index of word -> actual word cause CountVectorizer gives index
def map_to_word1(row, vocab):
    d = {}
    array = row.toArray()
    for i in range(len(row)):
        # if it is 0 -> ignore, else change the key to corresponding word
        if (array[i] != 0):
            tfidf = array[i]
            word = vocab[i]
            d[word] = tfidf
    return str(d)

def map_to_word(vocab):
    return udf(lambda row: map_to_word1(row, vocab))

############################# OUTPUT #############################

# apply udf to convert index back to word
df = rescaledData.withColumn("tfidf", map_to_word(vocab)(rescaledData.features))

df.printSchema()

output = df.select("asin", "tfidf")
output.write.format("csv").save("hdfs://{}:9000/{}".format(MASTER, RESULT_OUTPUT_DIR))

############################## STOP ##############################

sc.stop()