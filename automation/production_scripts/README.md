# Note

The scripts `sql_script.sh` and `mongo_script.sh` (and presumably `webserver.sh`) are called by `../main.sh`. Thus there is no need to run them individually (and manually); running `../main.sh` takes of that.

- `../main.sh` also takes care of the inbound network security setting for the MySQL and Mongo server. If you choose to deploy standalones, then you have to manually modify the network security setting in AWS platform.

If you still want to deploy a standalone server, then read on.

## Instruction for standalone deployment.

`sql_script.sh` and `mongo_script.sh` scripts can be executed on a fresh EC2 instance each (one script per instance) with `ami-0f82752aa17ff8f5d` by running the following line:

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
