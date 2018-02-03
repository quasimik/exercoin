from flask import Flask
from web3 import Web3, HTTPProvider, RPCProvider
import json
import os.path

web3 = Web3(RPCProvider(host='localhost', port='8545'))

with open('./sol/coin.abi', 'r') as abi_definition:
	abi = json.load(abi_definition)
contract_address = 0x2dee7a447dc2376c9159ff4b4caf3ae0c6cc31cd
contract = web3.eth.contract(abi, contract_address)


# block = web3.eth.getBlock('latest')

app = Flask(__name__)

@app.route("/")
def hello():
	return "Hello World!"


