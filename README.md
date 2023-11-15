# brc201-bridge-contracts

deploy

deployManager deploy manager contract - the main contract of bridge

```shell
npx hardhat deployManager --network <network>
```

deployToken deploy the mapping token of brc20

```shell
npx hardhat deployToken --name <name> --symbol <symbol> --decimals <decimals> --network <network>
```

addSupport add mapping token to support brc20 bridge

```shell
npx hardhat addSupport --name <name> --addr <addr>  --network <network>
```

removeSupport remove support token

```shell
npx hardhat removeSupport --name <name> --network <network>
```

grantRole add permission for a EOA address to submit bridge transation

```shell
npx hardhat grantRole --addr <addr> --network <network>
```
