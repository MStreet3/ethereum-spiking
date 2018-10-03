const fs = require("fs");
const solc = require('solc')
const Web3 = require('web3')

// set up the web3 instance
let provider = new Web3.providers.HttpProvider("http://127.0.0.1:8545");
let web3 = new Web3(provider);

// compile the contract

let source = fs.readFileSync('./MyToken.sol', 'utf8');
let compiledContract = solc.compile(source, 1);
let abi = compiledContract.contracts[':MyToken'].interface;
let bytecode = compiledContract.contracts[':MyToken'].bytecode;
let gasEstimate = web3.eth.estimateGas({data: bytecode});
let MyToken = web3.eth.contract(JSON.parse(abi));

// define the deploying account
let from = web3.eth.accounts[0];

var myContractInstance = MyToken.new({
    from:from,
    data:bytecode,
    gas:gasEstimate});

// The hash of the transaction, which created the contract
myContractInstance.transactionHash 

// address of the deployed contract
myContractInstance.address