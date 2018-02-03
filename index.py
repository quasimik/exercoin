from flask import Flask
from web3 import Web3, HTTPProvider

web3 = Web3(HTTPProvider('http://localhost:5000'))
block = web3.eth.getBlock('latest')

app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello World!"