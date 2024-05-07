const { Web3 } = require('web3');

const fs = require('fs');

const web3 = new Web3('HTTP://193.61.44.26:7545'); // Update with your Ganache RPC server address



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
const bytecode = '608060405234801561000f575f80fd5b50604051610718380380610718833981810160405281019061003191906100d4565b805f806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550506100ff565b5f80fd5b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f6100a38261007a565b9050919050565b6100b381610099565b81146100bd575f80fd5b50565b5f815190506100ce816100aa565b92915050565b5f602082840312156100e9576100e8610076565b5b5f6100f6848285016100c0565b91505092915050565b61060c8061010c5f395ff3fe608060405260043610610049575f3560e01c806327e235e31461004d57806347e7ef24146100895780638da5cb5b146100a5578063cce7ec13146100cf578063f8b2cb4f146100eb575b5f80fd5b348015610058575f80fd5b50610073600480360381019061006e91906103a4565b610127565b60405161008091906103e7565b60405180910390f35b6100a3600480360381019061009e9190610465565b61013c565b005b3480156100b0575f80fd5b506100b9610193565b6040516100c691906104b2565b60405180910390f35b6100e960048036038101906100e49190610465565b6101b6565b005b3480156100f6575f80fd5b50610111600480360381019061010c91906103a4565b610300565b60405161011e91906103e7565b60405180910390f35b6001602052805f5260405f205f915090505481565b8060015f8473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f82825461018891906104f8565b925050819055505050565b5f8054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b8060015f8473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f20541015610236576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161022d90610585565b60405180910390fd5b8060015f8473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f82825461028291906105a3565b925050819055508060015f805f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f8282546102f591906104f8565b925050819055505050565b5f60015f8373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f20549050919050565b5f80fd5b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f6103738261034a565b9050919050565b61038381610369565b811461038d575f80fd5b50565b5f8135905061039e8161037a565b92915050565b5f602082840312156103b9576103b8610346565b5b5f6103c684828501610390565b91505092915050565b5f819050919050565b6103e1816103cf565b82525050565b5f6020820190506103fa5f8301846103d8565b92915050565b5f61040a8261034a565b9050919050565b61041a81610400565b8114610424575f80fd5b50565b5f8135905061043581610411565b92915050565b610444816103cf565b811461044e575f80fd5b50565b5f8135905061045f8161043b565b92915050565b5f806040838503121561047b5761047a610346565b5b5f61048885828601610427565b925050602061049985828601610451565b9150509250929050565b6104ac81610369565b82525050565b5f6020820190506104c55f8301846104a3565b92915050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601160045260245ffd5b5f610502826103cf565b915061050d836103cf565b9250828201905080821115610525576105246104cb565b5b92915050565b5f82825260208201905092915050565b7f496e73556666696369656e742062616c616e63650000000000000000000000005f82015250565b5f61056f60148361052b565b915061057a8261053b565b602082019050919050565b5f6020820190508181035f83015261059c81610563565b9050919050565b5f6105ad826103cf565b91506105b8836103cf565b92508282039050818111156105d0576105cf6104cb565b5b9291505056fea264697066735822122096a0b5bbf95fea4bb8f774b51cd0e8432d39081a7b5fe128376dafcebf74845e64736f6c63430008190033'; // Your bytecode here


//const bytecode = '0x' +code;
/*

 */
//const contractAddress= '0xE0e450Dfa15591CF333B4f5642700e3f40449300'; 
const sellerAddress ='0xd4dC7058Fb14735c9146F0328AD2F0Bf1D9AD87f';
const privateKey='0x494fbacdd219cf5bdc4c0b6c4aba77f59d56206824c3e5487f666f6c04f13b5f';

async function deployContract(){
	try {
		const accounts = await web3.eth.getAccounts();
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
const contractAddress= deployContract();



//const contractAddress =  '0x620F5758693476e86745415C100C2Df29CFd361d';                                                                                                                                                             

//const contractAddress ='0x5511d49e5937F3a62d0bDA3159FF31D5e867876A';

//const contractAddress ='0x48517541a85f080Ed78947092f3D27B0b8652f24';



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
    
   toEth: async(bala)=> {
	return web3.utils.fromWei(bala.toString(), 'ether');},

    

    performTransaction: async (buyerAddress,total) => {
        try {
            const contractInstance = new web3.eth.Contract(abi, contractAddress);
            const accounts = await web3.eth.getAccounts();
            const totalPriceInWei = await web3.utils.toWei(total.toString(), 'ether');
            
            const bala = await Blockchain.getBalance(buyerAddress);
			const diff = bala-totalPriceInWei;
			console.log("buyer address",buyerAddress ,"price : ",totalPriceInWei,"balance :",bala,"diff",diff);
          

    // Check if balance is sufficient
    if (diff>0) {
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
			return { success: false, message: 'Error performing transaction:' };
        }
    },


	depositTransaction: async (buyerAddress,total) => {
        try {
        const contractInstance = new web3.eth.Contract(abi, contractAddress);
        //const accounts = await web3.eth.getAccounts();
		const totalPriceInWei = await web3.utils.toWei(total.toString(), 'ether');
        // Call deposit function
        const encodedABI = contractInstance.methods.deposit(buyerAddress, totalPriceInWei).encodeABI();
        const gasPrice = await web3.eth.getGasPrice();
        const gasLimit = 6721975; // Adjust gas limit as needed
        const tx1 = {
            from : sellerAddress,
            to: contractAddress,
            gas: gasLimit,
            gasPrice: gasPrice,
            data: encodedABI,
            value: 200 // This is for transferring any additional value, but your function doesn't accept ether, so set it to 0
        };

        // Sign the transaction
       const signedTx1 = await web3.eth.accounts.signTransaction(tx1, privateKey);
        // Send the signed transaction
        const receipt1 = await web3.eth.sendSignedTransaction(signedTx1.rawTransaction);
        console.log('Transaction receipt:', receipt1);
		return { success: true };
        } catch (error) {
            console.error('Error performing transaction: ', error);
			return { success: false, message: 'error making transaction' };
        }
    },




};
module.exports = Blockchain;