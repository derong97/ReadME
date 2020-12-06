# Pre-requisites

1. Please use a Linux machine (64-bit) as the automation script relies on bash commands. WSL works too.
2. Access the following information via the Vocareum platform after logging into the AWS Educate website. Click on "Account Details" button and show the `AWS CLI`:
   - `aws_access_key`
   - `aws_secret_access_key`
   - `aws_session_token`

# Deployment Instructions

The deployment makes use of the Cloud Formation template to create a stack on AWS. The script is optimized to run in parallel.

1. `cd automation`
   - There is no need to start a virtual environment.
2. Start the deployment in root mode: `sudo ./main.sh`. You will be prompted in the following order:

   - AWS Access Key ID: `aws_access_key`
   - AWS Secret Access Key: `aws_secret_access_key`
   - Default region: us-east-1
   - Default output format: (not required)
   - AWS Session Token: `aws_session_token`
   - Desired stack name: (up to you)
   - Desired cluster size: (choose a number from 2 to 6)

3. The entire deployment takes up about 15 minutes. Be patient!

# Troubleshooting

- If you made any typo error during keying in of information at the beginning, just `Ctrl-C` out of the script, and then run the teardown script (See Tear Down Instructions).
- To avoid errors in deployment, especially when you are reattempting `sudo ./main.sh` following a mistake/error, make sure you ran the teardown script beforehand.

- If you are facing `''$\r': command not found` errors:, refer to top-voted answer [here](https://askubuntu.com/questions/966488/how-do-i-fix-r-command-not-found-errors-running-bash-scripts-in-wsl).

# Post-Deployment

1. `logs.log` stores important information like the public IP addresses of the servers.
2. You can now access now the flask server remotely.
3. To run the analytics task, you can run:
   ```bash
   sudo ssh ubuntu@<namenode-public-IP> -i <aws-key> 'bash -s' < ./analytics_scripts/execute_analytics.sh
   ```
4. To scale hadoop cluster, you can choose which datanode to commission/decommision and then run:

   ```bash
   # Scaling down
   sudo ssh ubuntu@<namenode-public-IP> -i <aws-key> 'bash -s' < ./analytics_scripts/scaling_down.sh <datanode-private-IP>

   # Scaling up
   sudo ssh ubuntu@<namenode-public-IP> -i <aws-key> 'bash -s' < ./analytics_scripts/scaling_up.sh <datanode-private-IP>
   ```

# Tear Down Instructions

1. `cd automation`
2. Start the teardown in root mode: `sudo ./teardown.sh`. You will be prompted in the following order (skip this step if your credentials have not expired because they are already saved in ~/.aws/credentials):

   - AWS Access Key ID: `aws_access_key`
   - AWS Secret Access Key: `aws_secret_access_key`
   - Default region: us-east-1
   - Default output format: (not required)
   - AWS Session Token: `aws_session_token`

# Analytics

We used the following formula to calculate the Pearson correlation:

![Analytics](https://www.statisticshowto.com/wp-content/uploads/2009/11/pearsons-300x156.gif)

We used the following formula to calculate the TF-IDF:

![Analytics](https://lh3.googleusercontent.com/proxy/_MXfBwOZLoBgtKAxDgkQaUvt6NYrA6VXvFkvbM-MfykHvJquZYLtuFj0rSugXbllFv04i5jSaQQQN07SC78UvEba6aZHopFfL_puOdEntNfcQfVKeldff7fTLxylrZDiieLgdNHp37s)

To view the results after running analytics tasks:
1. (For correlation)

List out the output files from the task
   ```bash
   hdfs dfs -ls /corr
   ```
View the last output file
   ```bash
   hdfs dfs -cat /corr/part-00011
   ```
Results should look like this:

![Analytics](/automation/results/correlation.jpg)

2. (For tf-idf)

List out the output files from the task
 ```bash
   hdfs dfs -ls /tfidf
 ```
View the files
   ```bash
   hdfs dfs -cat /tfidf/part-00000
   ```
Results should look like this:

![Analytics](/results/tfidf.jpg)

# Logging

![Logging](results/logging.png)



