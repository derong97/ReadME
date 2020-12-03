# Pre-requisites

1. Please use a Linux machine (64-bit) as the automation script relies on bash commands.
   - WSL works too.
2. Access the following information via the Vocareum platform after logging into the AWS Educate website:
   - Click on "Account Details" button and show the `AWS CLI`:
     - `aws_access_key`
     - `aws_secret_access_key`
     - `aws_session_token`

# Deployment Instructions

The deployment makes use of the Cloud Formation templates to create a stack.

1. `cd automation`
   - There is no need to start a virtual environment.
2. Start the deployment in root mode: `sudo ./main.sh`. You will be prompted in the following order:

   - AWS Access Key ID: `aws_access_key`
   - AWS Secret Access Key: `aws_secret_access_key`
   - Default region: us-east-1
   - Default output format: (not required)
   - AWS Session Token: `aws_session_token`
   - Desired stack name: (up to you)
   - Desired cluster size: (accepts only 2, 4, 6, 8)

3. Deploying takes up at least 5 minutes. Be patient!

# Troubleshooting

- If you made any typo error during keying in of information at the beginning, just `Ctrl-C` out of the script, and then run the teardown script (See Tear Down Instructions).
- To avoid errors in deployment, especially when you are reattempting `sudo ./main.sh` following a mistake/error, make sure you ran the teardown script beforehand.

- If you are facing `''$\r': command not found` errors:, refer to top-voted answer [here](https://askubuntu.com/questions/966488/how-do-i-fix-r-command-not-found-errors-running-bash-scripts-in-wsl).

# Post-Deployment

1. `logs.log` stores important information like the public IP addresses of the servers.
2. You can now access now the flask server remotely.

# Tear Down Instructions

1. `cd automation`
2. Start the teardown in root mode: `sudo ./teardown.sh`. You will be prompted in the following order (skip this step if your credentials have not expired because they are already saved in ~/.aws/credentials):

   - AWS Access Key ID: `aws_access_key`
   - AWS Secret Access Key: `aws_secret_access_key`
   - Default region: us-east-1
   - Default output format: (not required)
   - AWS Session Token: `aws_session_token`
