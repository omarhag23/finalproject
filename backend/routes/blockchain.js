const { Web3 } = require('web3');

const fs = require('fs');

const web3 = new Web3('HTTP://193.61.44.23:7545'); // Update with your Ganache RPC server address



const abi = 
[
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_seller",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address payable",
				"name": "buyer",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "totalAmount",
				"type": "uint256"
			}
		],
		"name": "buy",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "seller",
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
const bytecode = '608060405234801561000f575f80fd5b506040516105c53803806105c5833981810160405281019061003191906100d4565b805f806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550506100ff565b5f80fd5b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f6100a38261007a565b9050919050565b6100b381610099565b81146100bd575f80fd5b50565b5f815190506100ce816100aa565b92915050565b5f602082840312156100e9576100e8610076565b5b5f6100f6848285016100c0565b91505092915050565b6104b98061010c5f395ff3fe608060405260043610610028575f3560e01c806308551a531461002c578063cce7ec1314610056575b5f80fd5b348015610037575f80fd5b50610040610072565b60405161004d9190610226565b60405180910390f35b610070600480360381019061006b91906102b1565b610095565b005b5f8054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b5f73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610103576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016100fa90610349565b60405180910390fd5b5f8111610145576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161013c906103d7565b60405180910390fd5b808273ffffffffffffffffffffffffffffffffffffffff1631101561019f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161019690610465565b60405180910390fd5b8173ffffffffffffffffffffffffffffffffffffffff166108fc8290811502906040515f60405180830381858888f193505050501580156101e2573d5f803e3d5ffd5b505050565b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f610210826101e7565b9050919050565b61022081610206565b82525050565b5f6020820190506102395f830184610217565b92915050565b5f80fd5b5f61024d826101e7565b9050919050565b61025d81610243565b8114610267575f80fd5b50565b5f8135905061027881610254565b92915050565b5f819050919050565b6102908161027e565b811461029a575f80fd5b50565b5f813590506102ab81610287565b92915050565b5f80604083850312156102c7576102c661023f565b5b5f6102d48582860161026a565b92505060206102e58582860161029d565b9150509250929050565b5f82825260208201905092915050565b7f496e76616c6964207573657220616464726573730000000000000000000000005f82015250565b5f6103336014836102ef565b915061033e826102ff565b602082019050919050565b5f6020820190508181035f83015261036081610327565b9050919050565b7f546f74616c20616d6f756e74206d7573742062652067726561746572207468615f8201527f6e207a65726f0000000000000000000000000000000000000000000000000000602082015250565b5f6103c16026836102ef565b91506103cc82610367565b604082019050919050565b5f6020820190508181035f8301526103ee816103b5565b9050919050565b7f5573657220646f6573206e6f74206861766520656e6f7567682062616c616e635f8201527f6500000000000000000000000000000000000000000000000000000000000000602082015250565b5f61044f6021836102ef565b915061045a826103f5565b604082019050919050565b5f6020820190508181035f83015261047c81610443565b905091905056fea2646970667358221220407b12c039edbaced066ae2e8382ec37593a5829de8223d4e8fed4efcdc808d964736f6c63430008190033'; // Your bytecode here



 

const Blockchain = {
    deployContract: async () => {
        const accounts = await web3.eth.getAccounts();
const sellerAddress = accounts[0];
const buyerAddress =accounts[1];

        try {
            const contract = new web3.eth.Contract(abi);
            console.log("contract found,trying to deploy, seller address : ",sellerAddress);
            const deploy = contract.deploy({
                data: bytecode,
                arguments: [sellerAddress]
            });

            const gas = await deploy.estimateGas();
            const receipt = await deploy.send({
                from: sellerAddress,
                gas: gas,
                gasPrice: '100' // Gas price
            });
            const contractAddress = receipt.options.address;
            console.log('Contract deployed at address:', contractAddress);
            return contractAddress;
        } catch (error) {
            console.error('Error deploying contract:', error);
            throw error; // Ensure to throw the error for proper handling
        }
    },

    performTransaction: async (contractAddress, totalPriceInDollars) => {
        try {
            const exchangeRate = 2000; // Ether exchange rate
            const totalPriceInEther = totalPriceInDollars / exchangeRate;
            const totalPriceInWei = web3.utils.toWei(totalPriceInEther.toString(), 'ether');
            const contractInstance = new web3.eth.Contract(abi, contractAddress);
            const tx = await contractInstance.methods.buy(account.address, totalPriceInWei).send({
                from: account.address,
                value: totalPriceInWei,
                gas: '500000', // Adjust the gas limit as needed
                gasPrice: '1000000000' // Gas price
            });
            console.log('Transaction receipt:', tx);
            return tx;
        } catch (error) {
            console.error('Error performing transaction:', error);
            throw error; // Ensure to throw the error for proper handling
        }
    }
};
module.exports = Blockchain;