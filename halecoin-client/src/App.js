import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import fire from './fire';

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
    this.state = { pushUpCount: 0 }; // <- set up react state
  }

  componentDidMount(){

    // Firebase DB ref
    let puRef = fire.database().ref('pushUpCount');

    // Update React state on ref change
    puRef.on('value', snapshot => {
      this.setState({ pushUpCount: snapshot.val() });
    })
  }


  incPuCount(element){
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
              <h1 style={{ fontFamily: 'Lato', fontSize: '4em' }}>{this.state.pushUpCount}</h1>
            </Col>
            <Col xs={3}>
              <h1 style={{ fontFamily: 'Lato', fontSize: '4em' }}>{this.state.pushUpCount}</h1>
            </Col>
          </Row>

          <Row><Col><div style={{ padding: '2em' }} /></Col></Row>

          <Row>
            <Col xsOffset={3} xs={6}>
              <img style={{ width: '500px', height: '300px' }} src="http://169.234.110.162:8080/video" />
            </Col>
          </Row>

        </Grid>
      </div>
    );
    // return (
    //     <Grid>
    //       <Row className="show-grid">
    //         <Col xs={12} md={8}>
    //           <form onSubmit={this.incPuCount.bind(this)}>
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
