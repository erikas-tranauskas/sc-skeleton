const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
    'seed phrase goes in here',
    'goerly-url'
);

const web3 = new Web3(provider);