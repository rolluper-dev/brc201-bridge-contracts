// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

interface ICrossChainManager {
    event ReceiveFromBtc(uint256 indexed amount,address indexed receiver,bytes32 indexed txId,string tokenName);
    event CrossToBtc(bytes32 indexed crossId,address indexed sender,uint256 indexed amount,string tokenName,string receiver);
    function receiveFromBtc(string calldata _name,uint256 _amount,address _receiver,bytes32 txId)external;
    function crossToBtc(string calldata _name,string calldata _receiver,uint256 _amount)external;
}