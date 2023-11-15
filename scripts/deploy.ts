import { BigNumber, Contract } from "ethers";
const hre = require("hardhat");
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

let MINTER_ROLE =ethers.utils.keccak256(ethers.utils.toUtf8Bytes("MINTER_ROLE"));
let MANAGER_ROLE =ethers.utils.keccak256(ethers.utils.toUtf8Bytes("MANAGER_ROLE"));
let manager = "0x9C6ddA6FdFdDE902cB9591c0b9A9CB4Ae06a4f51"
let mroup = "0x6f83bE47876cfA8D0B6e6555De5Cfb1847979C14"
let mordi = "0xda6AF1f198DfB228C36dD040d2391A117bEb8A63"
let mmapo = "0x3b0e3987f2E2EB333980a489B1508CA936F465b7"
let msats = "0x2116588ff8F1D8FC05C0C88f6afd6443EB1deE76"
let mpunk = "0xb15d31053FFaF650DbE396fa634Cb7fC5dB49B6b"
async function main() {
  let [wallet] = await ethers.getSigners();



  // await deployMappingToken("mpunk","mpk",18)
  // await deployManage();
  await  addSupport(manager,mpunk,"mpunk");
//  await grantRole(MINTER_ROLE,"0xb15d31053FFaF650DbE396fa634Cb7fC5dB49B6b","0x9C6ddA6FdFdDE902cB9591c0b9A9CB4Ae06a4f51")
// await addSupport("0x9D560E232F28e0076A68c8Bd84512722d19d4D35","0x9ED07e89E353447A193dF232B1508b3f8F764Cd9","mapo")
}

async function deployManage() {
  let [wallet] = await ethers.getSigners();
  let Manager = await ethers.getContractFactory("CrossChainManager");
  let manager = await Manager.deploy();
  await manager.deployed();
  console.log("manager deployed to :",manager.address);
}

async function deployMappingToken(name:string,symbol:string,decimals:number,) {
  let [wallet] = await ethers.getSigners();
  let MToken = await ethers.getContractFactory("MappingToken");
  let mtoken = await MToken.deploy(name,symbol,decimals,wallet.address);
  await mtoken.deployed();
  console.log("mtoken deployed to :",mtoken.address);
}

async function grantRole(role:string,addr:string,account:string) {
  let [wallet] = await ethers.getSigners();
  let Access = await ethers.getContractFactory("MappingToken");
  let access = Access.attach(addr);
  await ( await access.grantRole(role,account)).wait();
  console.log("grantRole success");
}

async function addSupport(manager_addr:string,mtoken_addr:string,tokenName:string) {
  let Manager = await ethers.getContractFactory("CrossChainManager");
  let manager = Manager.attach(manager_addr);
  let MToken = await ethers.getContractFactory("MappingToken");
  let mtoken = MToken.attach(mtoken_addr);
  await ( await mtoken.grantRole(MINTER_ROLE,manager_addr)).wait();
  await ( await manager.addSupport(tokenName,mtoken_addr)).wait();
  console.log("addSupport success");
}

async function removeSupport(manager_addr:string,tokenName:string) {
  let Manager = await ethers.getContractFactory("CrossChainManager");
  let manager = Manager.attach(manager_addr);
  await ( await manager.removeSupport(tokenName)).wait();
  console.log("removeSupport success");
}

async function receiveFromBtc(manager_addr:string,tokenName:string,receiver:string,amount:string ,blockNum:string,index:string) {
  let Manager = await ethers.getContractFactory("CrossChainManager");
  let manager = Manager.attach(manager_addr);
  await ( await manager.receiveFromBtc(tokenName,amount,receiver,blockNum,index)).wait();
  console.log("receiveFromBtc success");
}

async function crossToBtc(manager_addr:string,tokenName:string,receiver:string,amount:string) {
  let Manager = await ethers.getContractFactory("CrossChainManager");
  let manager = Manager.attach(manager_addr);
  await ( await manager.crossToBtc(tokenName,amount,receiver)).wait();
  console.log("crossToBtc success");
}



// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
