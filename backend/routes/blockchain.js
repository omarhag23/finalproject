const { Web3 } = require('web3');
const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7545");
const contractABI = [
    [
        {
            "inputs": [
                {
                    "internalType": "address payable",
                    "name": "_seller",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "_totalAmount",
                    "type": "uint256"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "inputs": [],
            "name": "buy",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "isWithdrawn",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "seller",
            "outputs": [
                {
                    "internalType": "address payable",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "totalAmount",
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
            "name": "withdraw",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ]
];

const contractBytecode = '0x...'; // Contract bytecode here
const buyerAddress = '0x...'; // Buyer's address here
const totalAmountInDollars = 100; // Total amount in dollars here


const TransactionContract = new web3.eth.Contract(contractABI);

const Blockchain = {
    deployContract: async () => {
        try {
            const accounts = await web3.eth.getAccounts();
            const deployerAddress = accounts[0]; // Use the first account as the deployer

            const newContractInstance = await TransactionContract.deploy({
                data: contractBytecode,
                arguments: [buyerAddress, totalAmountInDollars]
            }).send({
                from: deployerAddress,
                gas: 5000000,
                gasPrice: '20000000000'
            });

            console.log('Contract deployed at address:', newContractInstance.options.address);

            // No need to invoke the `buy()` method separately if it's already specified during deployment

            console.log('Transaction successful. Receipt:', newContractInstance.transactionHash);
        } catch (error) {
            console.error('Error occurred:', error);
            return { error: true };
        }
    }
};
