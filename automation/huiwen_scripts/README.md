For the hadoop cluster script, execute in the following order:

```bash
ssh -o StrictHostKeyChecking=no ubuntu@<namenode-public-IP> -i <aws-key> 'bash -s' < name_datanode.sh <namenode-private-IP> <datanode-private-IP>
ssh -o StrictHostKeyChecking=no ubuntu@<datanode-public-IP> -i <aws-key> 'bash -s' < name_datanode.sh <namenode-private-IP> <datanode-private-IP>
ssh -o StrictHostKeyChecking=no ubuntu@<namenode-public-IP> -i <aws-key> 'bash -s' < namenode1.sh
bash routing_key.sh <aws-key> <namenode-public-IP> <datanode-public-IP>
ssh -o StrictHostKeyChecking=no ubuntu@<namenode-public-IP> -i <aws-key> 'bash -s' < namenode2.sh <namenode-private-IP> <datanode-private-IP>
ssh -o StrictHostKeyChecking=no ubuntu@<datanode-public-IP> -i <aws-key> 'bash -s' < datanode1.sh
```
