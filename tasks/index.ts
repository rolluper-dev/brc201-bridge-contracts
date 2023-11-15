import { BigNumber, Signature } from "ethers";
import { task } from "hardhat/config";
import { DeployFunction } from 'hardhat-deploy/types';
import { HardhatRuntimeEnvironment } from 'hardhat/types';


task("deployManager",
    "deploy CrossChainManager"
)
    .setAction(async (taskArgs, HardhatRuntimeEnvironment) => {
        const { deployments, getNamedAccounts, ethers } = HardhatRuntimeEnvironment;
        const { deploy } = deployments;
        const { deployer } = await getNamedAccounts();

        console.log("deployer:",deployer)

        await deploy('CrossChainManager', {
            from: deployer,
            args: [],
            log: true,
            contract: 'CrossChainManager'
          });

    })

task("deployToken",
    "deploy MappingToken"
)
    .addParam("name", "token name")
    .addParam("symbol", "token symbol")
    .addParam("decimals", "token decimals")
    .setAction(async (taskArgs, HardhatRuntimeEnvironment) => {
        const { deployments, getNamedAccounts, ethers } = HardhatRuntimeEnvironment;
        const { deploy } = deployments;
        const { deployer } = await getNamedAccounts();

        console.log("deployer:",deployer)

        await deploy('MappingToken', {
            from: deployer,
            args: [taskArgs.name,taskArgs.symbol,taskArgs.decimals,deployer],
            log: true,
            contract: 'MappingToken'
          });

    })


task("addSupport",
    "addSupport"
)
    .addParam("name", "token name")
    .addParam("addr", "token address")
    .setAction(async (taskArgs, HardhatRuntimeEnvironment) => {
        const { deployments, getNamedAccounts, ethers } = HardhatRuntimeEnvironment;
        const { deploy } = deployments;
        const { deployer } = await getNamedAccounts();

        console.log("deployer:",deployer)

        let crossChainManager = await deployments.get('CrossChainManager');
        if(!crossChainManager){
            throw("deploy crossChainManager first");
        }
        let CrossChainManager = await ethers.getContractFactory("CrossChainManager");
        let manager = CrossChainManager.attach(crossChainManager.address);

        let role = CrossChainManager.attach(taskArgs.addr);

        let MINTER_ROLE = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("MINTER_ROLE"));

        await (await role.grantRole(MINTER_ROLE,manager.address)).await();

        let result = await (await manager.addSupport(taskArgs.name,taskArgs.addr)).wait();

        if(result.status == 1){
            console.log("addSupport succesce");
        } else {
            console.log("addSupport fail");
        }
    })

 task("removeSupport",
    "removeSupport"
)
    .addParam("name", "token name")
    .setAction(async (taskArgs, HardhatRuntimeEnvironment) => {
        const { deployments, getNamedAccounts, ethers } = HardhatRuntimeEnvironment;
        const { deploy } = deployments;
        const { deployer } = await getNamedAccounts();

        console.log("deployer:",deployer)

        let crossChainManager = await deployments.get('CrossChainManager');
        if(!crossChainManager){
            throw("deploy crossChainManager first");
        }
        let CrossChainManager = await ethers.getContractFactory("CrossChainManager");
        let manager = CrossChainManager.attach(crossChainManager.address);

        let result = await (await manager.removeSupport(taskArgs.name)).wait();

        if(result.status == 1){
            console.log("removeSupport succesce");
        } else {
            console.log("removeSupport fail");
        }
    })

task("grantRole",
    "grantRole"
)
    .addParam("addr", "role address")
    .setAction(async (taskArgs, HardhatRuntimeEnvironment) => {
        const { deployments, getNamedAccounts, ethers } = HardhatRuntimeEnvironment;
        const { deploy } = deployments;
        const { deployer } = await getNamedAccounts();

        console.log("deployer:",deployer)

        let crossChainManager = await deployments.get('CrossChainManager');
        if(!crossChainManager){
            throw("deploy crossChainManager first");
        }
        let CrossChainManager = await ethers.getContractFactory("CrossChainManager");
        let manager = CrossChainManager.attach(crossChainManager.address);
        let MANAGER_ROLE =ethers.utils.keccak256(ethers.utils.toUtf8Bytes("MANAGER_ROLE"));
        let result = await (await manager.grantRole(MANAGER_ROLE,taskArgs.addr)).wait();

        if(result.status == 1){
            console.log("grantRole succesce");
        } else {
            console.log("grantRole fail");
        }
    })