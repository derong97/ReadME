

# README



`sql_script.sh` and `mongo_script.sh` scripts can be executed on a fresh EC2 instance (one script per instance) with `ami-0f82752aa17ff8f5d` by running the following line:

```bash
ssh ubuntu@<public IP> -i key.pem 'bash -s' < sql_script.sh
```

```bash
ssh ubuntu@<public IP> -i key.pem 'bash -s' < mongo_script.sh
```

## Remote Connection

Note that script does not modify the inbound network security setting. You still have to manually modify the settings to enable access:

- `3306` for MySQL
- `27017` for Mongo

