# README

`sql_script.sh` and `mongo_script.sh` scripts can be executed on a fresh EC2 instance (one script per instance) with `ami-0f82752aa17ff8f5d` by running the following line:

```bash
ssh ubuntu@<public IP> -i key.pem 'bash -s' < sql_script.sh
```

```bash
ssh ubuntu@<public IP> -i key.pem 'bash -s' < mongo_script.sh
```

For the hadoop cluster script, execute in the following order (\*not working yet):

```bash
ssh -o StrictHostKeyChecking=no ubuntu@<namenode-public-IP> -i <aws-key> 'bash -s' < initial_cluster_setup.sh <namenode-private-IP> <datanode-private-IP>
ssh -o StrictHostKeyChecking=no ubuntu@<datanode-public-IP> -i <aws-key> 'bash -s' < initial_cluster_setup.sh <namenode-private-IP> <datanode-private-IP>
ssh -o StrictHostKeyChecking=no ubuntu@<namenode-public-IP> -i <aws-key> 'bash -s' < namenode1.sh
bash routing_key.sh <aws-key> <namenode-public-IP> <datanode-public-IP>
ssh -o StrictHostKeyChecking=no ubuntu@<namenode-public-IP> -i <aws-key> 'bash -s' < namenode2.sh <namenode-private-IP> <datanode-private-IP>
ssh -o StrictHostKeyChecking=no ubuntu@<datanode-public-IP> -i <aws-key> 'bash -s' < datanode1.sh
```

## Remote Connection

Note that script does not modify the inbound network security setting. You still have to manually modify the settings to enable access:

- `3306` for MySQL
- `27017` for Mongo
