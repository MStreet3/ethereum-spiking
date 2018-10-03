const fs = require("fs");
const solc = require('solc')
const Web3 = require('web3')

// set up the web3 instance
let provider = new Web3.providers.HttpProvider("http://127.0.0.1:8545");
let web3 = new Web3(provider);

// compile the contract
let source = fs.readFileSync('./MyToken.sol', 'utf8');  // read in the contract source code
let compiledContract = solc.compile(source, 1);  // compile the contract
let abi = JSON.parse(compiledContract.contracts[':MyToken'].interface); // extract and parse the contract's ABI
let bytecode = compiledContract.contracts[':MyToken'].bytecode; // get the contract bytecode
let gasEstimate = web3.eth.estimateGas({data: bytecode}); // see how much gas you'll need
let MyToken = web3.eth.contract(abi);  // define the contract object

// define the deploying account
let from = web3.eth.accounts[0];

// deploy a new instance of MyToken to the blockchain
var myContractInstance = MyToken.new({
    from:from,
    data:bytecode,
    gas:gasEstimate});

// The hash of the transaction, which created the contract
myContractInstance.transactionHash 

// address of the deployed contract
myContractInstance.address