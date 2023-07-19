const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
    'corn bullet knee girl gym ugly border wide program fresh hollow body',
    'https://goerli.infura.io/v3/ce83748745ea48ccbab0446d99a4af0e'
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: ['Message'] })
        .send({ from: accounts[0], gas: 1000000 });

    console.log(result.options.address);
    provider.engine.stop();
};

deploy();