const { Web3 } = require('web3');
const fs = require('fs');

const web3 = new Web3('HTTP://127.0.0.1:7545'); // Update with your Ganache RPC server address


const privateKey = '0x4939312b50468914d8e19aec58dde91aa18b3321e361a5e5f41b62a9d2ed298e'; // Replace with your private key from Ganache
const account = web3.eth.accounts.privateKeyToAccount(privateKey);

const abi = 
    [
        {
            "inputs": [
                {
                    "internalType": "address payable",
                    "name": "user",
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
            "stateMutability": "nonpayable",
            "type": "function"
        },
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
const bytecode = '608060405234801561000f575f80fd5b506040516106c93803806106c9833981810160405281019061003191906100d4565b805f806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550506100ff565b5f80fd5b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f6100a38261007a565b9050919050565b6100b381610099565b81146100bd575f80fd5b50565b5f815190506100ce816100aa565b92915050565b5f602082840312156100e9576100e8610076565b5b5f6100f6848285016100c0565b91505092915050565b6105bd8061010c5f395ff3fe608060405234801561000f575f80fd5b5060043610610034575f3560e01c806308551a5314610038578063cce7ec1314610056575b5f80fd5b610040610072565b60405161004d919061029c565b60405180910390f35b610070600480360381019061006b9190610327565b610095565b005b5f8054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b5f73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610103576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016100fa906103bf565b60405180910390fd5b5f8111610145576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161013c9061044d565b60405180910390fd5b5f8054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146101d2576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016101c9906104db565b60405180910390fd5b80471015610215576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161020c90610569565b60405180910390fd5b8173ffffffffffffffffffffffffffffffffffffffff166108fc8290811502906040515f60405180830381858888f19350505050158015610258573d5f803e3d5ffd5b505050565b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f6102868261025d565b9050919050565b6102968161027c565b82525050565b5f6020820190506102af5f83018461028d565b92915050565b5f80fd5b5f6102c38261025d565b9050919050565b6102d3816102b9565b81146102dd575f80fd5b50565b5f813590506102ee816102ca565b92915050565b5f819050919050565b610306816102f4565b8114610310575f80fd5b50565b5f81359050610321816102fd565b92915050565b5f806040838503121561033d5761033c6102b5565b5b5f61034a858286016102e0565b925050602061035b85828601610313565b9150509250929050565b5f82825260208201905092915050565b7f496e76616c6964207573657220616464726573730000000000000000000000005f82015250565b5f6103a9601483610365565b91506103b482610375565b602082019050919050565b5f6020820190508181035f8301526103d68161039d565b9050919050565b7f546f74616c20616d6f756e74206d7573742062652067726561746572207468615f8201527f6e207a65726f0000000000000000000000000000000000000000000000000000602082015250565b5f610437602683610365565b9150610442826103dd565b604082019050919050565b5f6020820190508181035f8301526104648161042b565b9050919050565b7f4f6e6c79207468652073656c6c65722063616e20696e697469617465207468655f8201527f2070757263686173650000000000000000000000000000000000000000000000602082015250565b5f6104c5602983610365565b91506104d08261046b565b604082019050919050565b5f6020820190508181035f8301526104f2816104b9565b9050919050565b7f5573657220646f6573206e6f74206861766520656e6f7567682062616c616e635f8201527f6500000000000000000000000000000000000000000000000000000000000000602082015250565b5f610553602183610365565b915061055e826104f9565b604082019050919050565b5f6020820190508181035f83015261058081610547565b905091905056fea264697066735822122033ced59096916aa530f051ee8c7146a8bb477f71c734b57d8d94f662c02a526c64736f6c63430008190033'; // Your bytecode here


const accounts = web3.eth.accounts;
const userAccount =accounts[1];
const Blockchain = {
    deployContract: async () => {
        const sellerAddress = '0x2516F83D12E50A1980caFd962AB73226319D5AF7'; // Replace with actual seller address
        const contract = new web3.eth.Contract(abi);
        const deploy = contract.deploy({
            data: bytecode,
            arguments: [sellerAddress]
        });
    
        const gas = await deploy.estimateGas();
        const receipt = await deploy.send({
            from: account.address,
            gas: gas,
            gasPrice: '1000000000' // Gas price
        });
        const contractAddress = receipt.options.address;
        console.log('Contract deployed at address:', contractAddress);
        return contractAddress;
    },

    performTransaction: async (contractAddress, userAccount, totalPrice) => {
        try {
            const contractInstance = new web3.eth.Contract(abi, contractAddress);
            const tx = await contractInstance.methods.buy(userAccount, totalPrice).send({
                from: account.address,
                value: totalPrice,
                gas: '500000', // Adjust the gas limit as needed
                gasPrice: '1000000000' // Gas price
            });
            console.log('Transaction receipt:', tx);
            return tx;
        } catch (error) {
            console.error('Error occurred:', error);
            return { error: true };
        }
    }
};
