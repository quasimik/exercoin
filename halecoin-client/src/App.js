import React, { Component } from 'react';
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

  componentWillMount(){

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
        <form onSubmit={this.incPuCount.bind(this)}>
          <input type="submit"/>
          <p>{this.state.pushUpCount}</p>
        </form>
    );
  }
}

export default App;
