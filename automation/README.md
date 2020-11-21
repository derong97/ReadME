# Pre-requisites

1. Please use a Linux machine (64-bit) as the automation script relies on bash commands.
2. Before you start the deployment, ensure that you have the following information ready:
   - Your aws access key
   - Your aws secret access key
   - Your aws session token
   - Your desired public-private keypair name (otherwise set to 'default')

# Deployment Instructions

The deployment makes use of the Cloud Formation template to create a stack. The configurations can be found in `cloud_formation/template.json`.

1. `cd automation`
2. Start the deployment in root mode: `sudo ./main.sh`
   - Key in the information, when prompted
     - For default region, please enter: `us-east-1`
   - The important key-value pairs will be stored in `logs.log`

# Tear Down Instructions

1. `cd automation`
2. Start the teardown in root mode: `sudo ./teardown.sh`
