const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require('../compile');

const INITIAL_MESSAGE = 'first initial message';

let accounts = [];
let inbox;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: [INITIAL_MESSAGE] })
        .send({ from: accounts[0], gas: 1000000 });
});

describe('Inbox', () => {
    it('contract deployment success', () => {
        assert.ok(inbox.options.address);
    });

    it('initial message check', async () => {
        assert.equal(await inbox.methods.message().call(), INITIAL_MESSAGE);
    });

    it('set message check', async () => {
        const expected = 'test message';
        await inbox.methods.setMessage(expected).send({ from: accounts[0] });

        assert.equal(expected, await inbox.methods.message().call());
    });
});
