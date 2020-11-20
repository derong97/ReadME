# Pre-requisites

1. Use a 64-bit Linux machine as the automation heavily relies on bash commands.
2. Ensure that you have the following information ready before starting the deployment:
   - Your aws access key
   - Your aws secret access key
   - Your aws session token
   - Your desired public-private keypair name (otherwise set to 'default')

# Deployment Instructions

The deployment makes use of the Cloud Formation template to create a stack. The configurations can be found in `cloud_formation/template.json`.

1. `cd automation`
2. Start the deployment in root mode: `sudo ./main.sh`
   - Key in the information, when prompted
