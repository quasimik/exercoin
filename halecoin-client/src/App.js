import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import fire from './fire';
import YouTube from 'react-youtube';
import Web3 from 'web3';

// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { messages: [] }; // <- set up react state
//   }
//   componentWillMount(){
//     /* Create reference to messages in Firebase Database */
//     let messagesRef = fire.database().ref('messages').orderByKey().limitToLast(100);
//     messagesRef.on('child_added', snapshot => {
//       /* Update React state when message is added at Firebase Database */
//       let message = { text: snapshot.val(), id: snapshot.key };
//       this.setState({ messages: [message].concat(this.state.messages) });
//     })
//   }
//   addMessage(e){
//     e.preventDefault(); // <- prevent form submit from reloading the page
//     /* Send the message to Firebase */
//     fire.database().ref('messages').push( this.inputEl.value );
//     this.inputEl.value = ''; // <- clear the input
//   }
//   render() {
//     return (
//         <form onSubmit={this.addMessage.bind(this)}>
//           <input type="text" ref={ el => this.inputEl = el }/>
//           <input type="submit"/>
//           <ul>
//             {  // Render the list of messages 
//               this.state.messages.map( message => <li key={message.id}>{message.text}</li> )
//             }
//           </ul>
//         </form>
//     );
//   }
// }

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { pushUpCount: 0, haleCoinBal: 0 }; // <- set up react state

    var web3 = new Web3(Web3.givenProvider);
    web3.eth.account = "0x0CdDf71BE31F4512d029d70e67fD994f2a0Cc633";
    // var abi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_amount","type":"uint256"}],"name":"earnCoin","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_amount","type":"uint256"}],"name":"incrementSupply","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"initialSupply","type":"uint256"},{"name":"tokenName","type":"string"},{"name":"tokenSymbol","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}]
    // var address = '0x2dee7a447dc2376c9159ff4b4caf3ae0c6cc31cd';
    // this.contract = new web3.eth.Contract(abi, address);
    this.eth = web3.eth
  }

  componentDidMount(){

    // Firebase DB ref
    let pushupReference = fire.database().ref('pushUpCount');

    // Eth
    let haleCoinBal = 0;

    // Update React state on ref change
    pushupReference.on('value', snapshot => {
      this.setState({ pushUpCount: snapshot.val() });
      this.eth.getBalance(this.eth.account).then( (res) => { this.setState({ haleCoinBal: res / 1000000000000000000 }) });
    })
  }

  getBalance(){
    // this.contract.methods.balanceOf(this.eth.account).call().then( (res) => { console.log(res); return res; });
    var bal = this.eth.getBalance(this.eth.account).then( (res) => {console.log(res); return res;});
  }

  earnCoin(amount){
    // this.contract.earnCoin(amount);
  }

  incrementPU() {
  }

  incrementPUHandler(element){
    element.preventDefault(); // <- prevent form submit from reloading the page
    // Increment push-up count in Firebase DB
    fire.database().ref('pushUpCount').set(this.state.pushUpCount + 1);
  }

  render() {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Grid>

          <Row>
            <Col xsOffset={3} xs={3}>
              <h1 style={{ fontFamily: 'Berkshire Swash' }}>Push-ups</h1>
            </Col>
            <Col xs={3}>
              <h1 style={{ fontFamily: 'Berkshire Swash' }}>HaleCoins</h1>
            </Col>
          </Row>

          <Row>
            <Col xsOffset={3} xs={3}>
              <h1 style={{ fontFamily: 'Lato', fontSize: '4em' }} onClick={this.incrementPUHandler.bind(this)}>{this.state.pushUpCount}</h1>
            </Col>
            <Col xs={3}>
              <h1 style={{ fontFamily: 'Lato', fontSize: '4em' }}>{this.state.haleCoinBal}</h1>
            </Col>
          </Row>

          <Row><Col><div style={{ padding: '2em' }} /></Col></Row>

          <Row>
            <Col xsOffset={3} xs={6}>
              <img style={{ width: '500px', height: '300px' }} src="http://169.234.110.162:8080/video" />
            </Col>
          </Row>
          
          <Row>
            <Col xsOffset={3} xs={6}>
            </Col>
          </Row>
          

        </Grid>
      </div>
    );
    // return (
    //     <Grid>
    //       <Row className="show-grid">
    //         <Col xs={12} md={8}>
    //           <form onSubmit={this.incrementPUHandler.bind(this)}>
    //             <input type="submit"/>
    //             <p>{this.state.pushUpCount}</p>
    //           </form>
    //         </Col>
    //         <Col xs={6} md={4}>
    //           <code>&lt;{'Col xs={6} md={4}'} /&gt;</code>
    //         </Col>
    //       </Row>

    //       <Row className="show-grid">
    //         <Col xs={6} md={4}>
    //           <code>&lt;{'Col xs={6} md={4}'} /&gt;</code>
    //         </Col>
    //         <Col xs={6} md={4}>
    //           <code>&lt;{'Col xs={6} md={4}'} /&gt;</code>
    //         </Col>
    //         <Col xsHidden md={4}>
    //           <code>&lt;{'Col xsHidden md={4}'} /&gt;</code>
    //         </Col>
    //       </Row>

    //       <Row className="show-grid">
    //         <Col xs={6} xsOffset={6}>
    //           <code>&lt;{'Col xs={6} xsOffset={6}'} /&gt;</code>
    //         </Col>
    //       </Row>

    //       <Row className="show-grid">
    //         <Col md={6} mdPush={6}>
    //           <code>&lt;{'Col md={6} mdPush={6}'} /&gt;</code>
    //         </Col>
    //         <Col md={6} mdPull={6}>
    //           <code>&lt;{'Col md={6} mdPull={6}'} /&gt;</code>
    //         </Col>
    //       </Row>
    //     </Grid>
    // );
  }
}

export default App;
