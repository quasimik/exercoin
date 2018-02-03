from flask import Flask
from web3 import Web3, HTTPProvider, RPCProvider
import json

web3 = Web3(HTTPProvider("http://localhost:5000"))

with open('./sol/coin.abi', 'r') as abi_definition:
    abi = json.load(abi_definition)
contract_address = '0x2dee7a447dc2376c9159ff4b4caf3ae0c6cc31cd'
contract = web3.eth.contract(abi, contract_address)

"""print(web3.eth.defaultAccount)
print(web3.eth.accounts)
print(web3.eth.accounts[0])
"""

app = Flask(__name__)


from app import views

