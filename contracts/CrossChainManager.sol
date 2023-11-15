
// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;


import "./interface/IMintBurnERC20.sol";
import "./interface/ICrossChainManager.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract CrossChainManager is AccessControl,ICrossChainManager{
    bytes32 public constant MANAGER_ROLE = keccak256("MANAGER_ROLE");
    
    // keccak256("name") => wtoken address
    mapping (bytes32 => address) public tokens;

    mapping (bytes32 => bool) public receives;
    
    uint256 public crossCount;

    event AddSuport(address indexed wtoken,string tokenName);

    event RemoveSupport(string tokenName);

    constructor(){
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function addSupport(string calldata _name,address _wtoken) external onlyRole(getRoleAdmin(DEFAULT_ADMIN_ROLE)) {
         bytes32 hash_name = keccak256(abi.encodePacked(_name));
         require(_wtoken.code.length > 0);
         tokens[hash_name] = _wtoken;
         emit AddSuport(_wtoken,_name);
    } 

    function removeSupport(string calldata _name) external onlyRole(getRoleAdmin(DEFAULT_ADMIN_ROLE)){
         bytes32 hash_name = keccak256(abi.encodePacked(_name));
         tokens[hash_name] = address(0);
         emit RemoveSupport(_name);
    }
    
     
   function receiveFromBtc(string calldata _name,uint256 _amount,address _receiver,bytes32 txId)external override onlyRole(MANAGER_ROLE){
         require(_receiver != address(0),"zero address");
         bytes32 hash_name = keccak256(abi.encodePacked(_name));
         address wtoken = tokens[hash_name];
         require(wtoken != address(0),"not support");
         require(!receives[txId],"already receive");
         receives[txId] = true;
         IMintBurnERC20(wtoken).mint(_receiver,_amount);
         emit ReceiveFromBtc(_amount,_receiver,txId,_name);
   }

   function crossToBtc(string calldata _name,string calldata _receiver,uint256 _amount)external override{
        //check _receiver is validate bitcion address  todo
         bytes32 hash_name = keccak256(abi.encodePacked(_name));
         address wtoken = tokens[hash_name];
         require(wtoken != address(0),"not support"); 
         crossCount ++;
         bytes32 crossId = keccak256(abi.encodePacked(_name,_amount,_receiver,msg.sender,crossCount));
         IMintBurnERC20(wtoken).burnFrom(msg.sender,_amount);
         emit CrossToBtc(crossId,msg.sender,_amount,_name,_receiver);
   }

}