const Web3 = require('web3');
const infuraEndpoint = 'https://app.infura.io/key/42abaeeb98a64c7ba25145d8cbf063f2/all-endpoints';

// Create a Web3 instance with Infura as the provider
const web3 = new Web3(new Web3.providers.HttpProvider(infuraEndpoint));

// Now you can use the web3 instance to interact with the Ethereum network
web3.eth.getBlockNumber().then(console.log); // Example: Get the latest block number
web3.eth.getAccounts(console.log);

var Contract = require('web3-eth-contract');


var myContract = new web3.eth.Contract([...], '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe', {
    from: '0x1234567890123456789012345678901234567891', // default from address
    gasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
});
myContract.options.address
// set provider for all later instances to use
Contract.setProvider('https://app.infura.io/key/42abaeeb98a64c7ba25145d8cbf063f2/all-endpoints');

var contract = new Contract(jsonInterface, address);

contract.methods.somFunc().send({from: ....})
.on('receipt', function(){
    ...
});