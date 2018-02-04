import React, { Component } from 'react';
import Sound from 'react-sound'
import { Grid, Row, Col } from 'react-bootstrap';
import fire from './fire'; // Firebase config and init
import Web3 from 'web3';
// import { bounce } from 'react-animations';
// import { StyleSheet, css } from 'aphrodite';
// import YouTube from 'react-youtube';
// import { FirebaseAuth } from 'react-firebaseui';
// import firebase from 'firebase';
import Particles from 'react-particles-js';
// import Anime from 'react-anime'
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
// import Tx from 'ethereumjs-tx';

// import Background from './background.jsx'


const HALE_COIN_PER_PUSHUP = 50000000000000000


// // Configure FirebaseUI.
// const uiConfig = {
//   // Popup signin flow rather than redirect flow.
//   signInFlow: 'popup',
//   // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
//   signInSuccessUrl: '/signedIn',
//   // We will display Google and Facebook as auth providers.
//   signInOptions: [
//     firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//     firebase.auth.FacebookAuthProvider.PROVIDER_ID
//   ]
// };

// const styles = StyleSheet.create({
//   bounce: {
//     animationName: bounce,
//     animationDuration: '1s'
//   }
// })
class App extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      pushUpCount: 0, 
      haleCoinEarned: 0, 
      haleCoinBal: 0, 

      playing: Sound.status.STOPPED,
      volume: 100,
      playbackRate: 1.5,
      autoLoad: true,
      playFromPosition: 0 }; // <- set up react state

    var web3 = new Web3(Web3.givenProvider);
    web3.eth.accountSender = "0x0CdDf71BE31F4512d029d70e67fD994f2a0Cc633";
    web3.eth.accountReceiver = "0x73c3dF6BC9b859A38B60baEe2f3B4FcD98E86923";
    this.accountSenderAccount = web3.eth.accounts.privateKeyToAccount('84edd0b528a087fc6c0430b08f2b2a9b21a0632829fff49ffe738325502204a3');
    this.eth = web3.eth
  }

  componentDidMount(){

    // Firebase DB ref
    let pushupReference = fire.database().ref('pushUpCount');

    // Firebase DB ref
    let haleCoinReference = fire.database().ref('haleCoinEarned');

    // Eth
    let haleCoinBal = 0;

    // Update React state on ref change
    pushupReference.on('value', snapshot => {

      if(this.state.pushUpCount != 0) this.setState({ playing: Sound.status.PLAYING })
      // Increment pushup count and particles count
      this.setState({ pushUpCount: snapshot.val() });
      console.log(this.state.particleScale)
      this.eth.getBalance(this.eth.accountReceiver).then( (res) => { this.setState({ haleCoinBal: res }) });

      // Increment halecoins earned
      fire.database().ref('haleCoinEarned').set(this.state.haleCoinEarned + HALE_COIN_PER_PUSHUP);
    })

    // Update React state on ref change
    haleCoinReference.on('value', snapshot => {
      this.setState({ haleCoinEarned: snapshot.val() });
    })
  }

  // getBalance(){
  //   var bal = this.eth.getBalance(this.eth.accountReceiver).then( (res) => {console.log(res); return res;});
  // }

  // transferCoinOnePU(){
    // this.eth.accounts.signTransaction({ from: this.eth.accountSender, to: this.eth.accountReceiver, value: HALE_COIN_PER_PUSHUP, gas: '10000000' }, '84edd0b528a087fc6c0430b08f2b2a9b21a0632829fff49ffe738325502204a3').then( (res) => {
    //   this.eth.sendSignedTransaction(res);
    // });
    // this.eth.sendTransaction({from: this.eth.accountSender, to:this.eth.accountReceiver, value: HALE_COIN_PER_PUSHUP, gasLimit: 21000, gasPrice: 20000000000})

    // this.eth.personal.unlockAccount(this.eth.accountSender, 'qazxcdews123', 1000);
    // this.eth.signTransaction({
    //     from: this.eth.accountSender,
    //     gasPrice: "20000000000",
    //     gas: "21000",
    //     to: this.eth.accountReceiver,
    //     value: HALE_COIN_PER_PUSHUP,
    //     data: ""
    // }).then( () => {
    //   this.eth.sendSignedTransaction;
    // });
    // var privateKey = new Buffer('84edd0b528a087fc6c0430b08f2b2a9b21a0632829fff49ffe738325502204a3', 'hex')
    // var rawTx = {
    //   gasPrice: '0x09184e72a000',
    //   gasLimit: '0x2710',
    //   to: this.eth.accountReceiver,
    //   value: HALE_COIN_PER_PUSHUP,
    //   data: '0x7f7465737432000000000000000000000000000000000000000000000000000000600057'
    // }

  //   var tx = new Tx(rawTx);
  //   tx.sign(privateKey);

  //   var serializedTx = tx.serialize();

  //   this.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
  //   .on('receipt', console.log);
  // }

  incrementPU() {
  }

  resetPUHandler() {
    fire.database().ref('haleCoinEarned').set(0);
    fire.database().ref('pushUpCount').set(0);
  }

  incrementPUHandler(element){
    element.preventDefault(); // <- prevent form submit from reloading the page

    // Increment push-up count in Firebase DB
    fire.database().ref('pushUpCount').set(this.state.pushUpCount + 1);

    // Actually send the relevant coins (obviously not for production)
    // this.transferCoinOnePU()
  }

  render() {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', textAlign: 'center', 
                    background: 'radial-gradient(at bottom, #621708, #220901)' }}>
        <Particles  
          style={{ position: 'fixed', width: '100vw', height: '100vh' }} 
          params={{ particles: { number: { value: 80 + this.state.haleCoinEarned * 10 }, size: { value: 5 }, line_linked: { enable: false }, move: { speed: 12 + this.state.haleCoinEarned * 2 } } }}
        />
        <Grid>
          {/*}
          <Row>
            <Col xsOffset={3} xs={6}>
              <FirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
            </Col>
          </Row>
        */}

          <Row>
            <Col xsOffset={2} xs={4}>
              <h1 onClick={this.resetPUHandler.bind(this)}>PUSHUPS</h1>
            </Col>
            <Col xs={4}>
              <h1>HALECOINS</h1>
            </Col>
            {/*<Col xs={4}>
              <h1 style={{ fontFamily: 'Berkshire Swash' }}>Wallet Balance</h1>
              <h5>(Delay is intrinsic to Ethereum network)</h5>
            </Col>*/}
          </Row>

          <Row>
            <Col xsOffset={2} xs={4}>
              <h1 className='num' onClick={this.incrementPUHandler.bind(this)}>{this.state.pushUpCount}</h1>
            </Col>
            <Col xs={4}>
              <h1 className='num'>{this.state.haleCoinEarned / 1000000000000000000}</h1>
            </Col>
            {/*<Col xs={4}>
              <h1 style={{ fontFamily: 'Lato', fontSize: '4em' }}>{this.state.haleCoinBal / 1000000000000000000}</h1>
            </Col>*/}
          </Row>

          <Row><Col xs={12}><div style={{ padding: '2em' }} /></Col></Row>

          <Row>
            <Col xsOffset={3} xs={6}>
              <img style={{ width: '500px', height: '300px', border: '6px solid #f9e7e5', boxShadow: '0 0 5px #000' }} src="http://169.234.110.162:8080/video" />
            </Col>
          </Row>
          
          <Row>
            <Col xsOffset={3} xs={6}>
            </Col>
          </Row>
          

        </Grid>

        <Sound
                url="./anotherone.mp3"
                playStatus={this.state.playing}
                volume={this.state.volume}
                playbackRate={this.state.playbackRate}
                playFromPosition={this.state.playFromPosition}
                autoLoad={this.state.autoLoad}
                onError={(errorCode, description) => console.log(description)}
                onLoading={() => console.log('Loading Khaled')}
                onLoad={() => console.log('Loaded')}
                onPause={() => console.log('Paused')}
                onResume={() => console.log('Resumed')}
                onStop={() => console.log('Stopped')}
                onFinishedPlaying={() => this.setState({ playing: Sound.status.STOPPED })} />
      </div>
    );
  }
}

export default App;
