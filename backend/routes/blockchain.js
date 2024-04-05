const { Web3 } = require('web3');

const fs = require('fs');

const web3 = new Web3('HTTP://193.61.44.51:7545'); // Update with your Ganache RPC server address



const abi = 
[
	{
		"inputs": [
			{
				"internalType": "address payable",
				"name": "seller",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "balances",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address payable",
				"name": "user",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "buy",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address payable",
				"name": "user",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "deposit",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "getBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
const bytecode = '608060405234801561001057600080fd5b50604051610757380380610757833981810160405281019061003291906100db565b806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050610108565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006100a88261007d565b9050919050565b6100b88161009d565b81146100c357600080fd5b50565b6000815190506100d5816100af565b92915050565b6000602082840312156100f1576100f0610078565b5b60006100ff848285016100c6565b91505092915050565b610640806101176000396000f3fe60806040526004361061004a5760003560e01c806327e235e31461004f57806347e7ef241461008c5780638da5cb5b146100a8578063cce7ec13146100d3578063f8b2cb4f146100ef575b600080fd5b34801561005b57600080fd5b50610076600480360381019061007191906103c1565b61012c565b6040516100839190610407565b60405180910390f35b6100a660048036038101906100a1919061048c565b610144565b005b3480156100b457600080fd5b506100bd61019e565b6040516100ca91906104db565b60405180910390f35b6100ed60048036038101906100e8919061048c565b6101c2565b005b3480156100fb57600080fd5b50610116600480360381019061011191906103c1565b610315565b6040516101239190610407565b60405180910390f35b60016020528060005260406000206000915090505481565b80600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546101939190610525565b925050819055505050565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b80600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541015610244576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161023b906105b6565b60405180910390fd5b80600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825461029391906105d6565b9250508190555080600160008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825461030a9190610525565b925050819055505050565b6000600160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061038e82610363565b9050919050565b61039e81610383565b81146103a957600080fd5b50565b6000813590506103bb81610395565b92915050565b6000602082840312156103d7576103d661035e565b5b60006103e5848285016103ac565b91505092915050565b6000819050919050565b610401816103ee565b82525050565b600060208201905061041c60008301846103f8565b92915050565b600061042d82610363565b9050919050565b61043d81610422565b811461044857600080fd5b50565b60008135905061045a81610434565b92915050565b610469816103ee565b811461047457600080fd5b50565b60008135905061048681610460565b92915050565b600080604083850312156104a3576104a261035e565b5b60006104b18582860161044b565b92505060206104c285828601610477565b9150509250929050565b6104d581610383565b82525050565b60006020820190506104f060008301846104cc565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000610530826103ee565b915061053b836103ee565b9250828201905080821115610553576105526104f6565b5b92915050565b600082825260208201905092915050565b7f496e73756666696369656e742062616c616e6365000000000000000000000000600082015250565b60006105a0601483610559565b91506105ab8261056a565b602082019050919050565b600060208201905081810360008301526105cf81610593565b9050919050565b60006105e1826103ee565b91506105ec836103ee565b9250828203905081811115610604576106036104f6565b5b9291505056fea26469706673582212200c7d5dabfe80e9601a20ef9ceb2f7d247094bf92669570c6f7551b8bb068ea8364736f6c63430008190033'; // Your bytecode here


const privateKey ='0xf52ad7084aa1fe9b5a1be33eba6d453d7e06b4d3ecb5971e2e469f4ab42670b1';

//const bytecode = '0x' +code;
/*

 */
//const contractAddress= '0xE0e450Dfa15591CF333B4f5642700e3f40449300'; 

async function deployContract(){
	try {
		const accounts = await web3.eth.getAccounts();
        const sellerAddress =accounts[0];
		const contract = new web3.eth.Contract(abi);
		console.log("contract found,trying to deploy, seller address : ",sellerAddress);
		const deploy = contract.deploy({
			data: bytecode,
			arguments: [sellerAddress]
		});
		console.log("contract deployed, estimating gas... ");
	   // const as = '875000';
		const gas = await deploy.estimateGas();
		
		const receipt = await deploy.send({
			from: sellerAddress,
			gas: gas,
			gasPrice: '3000000000' // Gas price
		});
		const contractAddress = receipt.options.address;
		console.log('Contract deployed at address:', contractAddress);
		return contractAddress;
	} catch (error) {
		console.error('Error deploying contract:', error);
		throw error; // Ensure to throw the error for proper handling
	}
};

//const contractAddress=deployContract();


//const contractAddress = '0x31E6C828D34651DA31A1D47e245f8e4Fc92345ff'; 
const contractAddress ='0x5511d49e5937F3a62d0bDA3159FF31D5e867876A';


const Blockchain = {

    getAddress: async(i)=> {
        try {
			const accounts = await web3.eth.getAccounts();
            const buyerAddress =accounts[i];
            return buyerAddress
        } catch (error) {
            console.error('Error getting Accounts:', error);
            throw error; 
            return null;// Ensure to throw the error for proper handling
        
        }
    },

	getBalance: async(buyerAddress)=> {
        try {
            const contractInstance = new web3.eth.Contract(abi, contractAddress);
            const balance = await contractInstance.methods.getBalance(buyerAddress).call();       
            console.log('Buyer balance now:', balance.toString());
			const bala =balance.toString() ;
            return bala;
        } catch (error) {
            console.error('Error getting Balance:', error);
            throw error; 
            // Ensure to throw the error for proper handling
        
        }
    },
    

    

    performTransaction: async (buyerAddress,totalPriceInDollars) => {
        try {
            const contractInstance = new web3.eth.Contract(abi, contractAddress);
            const accounts = await web3.eth.getAccounts();
            const sellerAddress = accounts[0];
            const exchangeRate = 2000; // Ether exchange rate
            const totalPriceInEther = totalPriceInDollars / exchangeRate;
            const totalPriceInWei = web3.utils.toWei(totalPriceInEther.toString(), 'ether');
            console.log("buyer address",buyerAddress)
            const bala = await Blockchain.getBalance(buyerAddress);
          

    // Check if balance is sufficient
    if (bala >= totalPriceInWei) {
        // Call buy function
        const encodedABI = contractInstance.methods.buy(buyerAddress, totalPriceInWei).encodeABI();
        const gasPrice = await web3.eth.getGasPrice();
        const gasLimit = 2000000; // Adjust gas limit as needed
        const tx = {
            from : sellerAddress,
            to: contractAddress,
            gas: gasLimit,
            gasPrice: gasPrice,
            data: encodedABI,
            value: 0 // This is for transferring any additional value, but your function doesn't accept ether, so set it to 0
        };

        // Sign the transaction
        const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);

        // Send the signed transaction
        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        console.log('Transaction receipt:', receipt);
      
		return { success: true };
    } else {
        console.log('Insufficient balance to make the purchase, make a deposit before purchasing');
        return { success: false, message: 'Insufficient balance to make the purchase, make a deposit before purchasing' };
    }
        } catch (error) {
            console.error('Error performing transaction:', error);
            throw error; // Ensure to throw the error for proper handling
			return { success: false, message: 'Error performing transaction:' };
        }
    },


	depositTransaction: async (buyerAddress,totalPriceInDollars) => {
        try {
            const contractInstance = new web3.eth.Contract(abi, contractAddress);
            const accounts = await web3.eth.getAccounts();
            const sellerAddress = accounts[0];
            const exchangeRate = 2000; // Ether exchange rate
            const totalPriceInEther = totalPriceInDollars / exchangeRate;
            const totalPriceInWei = web3.utils.toWei(totalPriceInEther.toString(), 'ether');
        // Call buy function
        const encodedABI = contractInstance.methods.deposit(buyerAddress, totalPriceInWei).encodeABI();
        const gasPrice = await web3.eth.getGasPrice();
        const gasLimit = 2000000; // Adjust gas limit as needed
        const tx = {
            from : sellerAddress,
            to: contractAddress,
            gas: gasLimit,
            gasPrice: gasPrice,
            data: encodedABI,
            value: 0 // This is for transferring any additional value, but your function doesn't accept ether, so set it to 0
        };

        // Sign the transaction
        const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);

        // Send the signed transaction
        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        console.log('Transaction receipt:', receipt);
		return { success: true };
        } catch (error) {
            console.error('Error performing transaction:', error);
            throw error; // Ensure to throw the error for proper handling
			return { success: false, message: 'error making transaction' };
        }
    },




};
module.exports = Blockchain;