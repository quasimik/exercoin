import firebase from 'firebase'
var config = {
    apiKey: "AIzaSyAvaBf80ZrK7TH2xhpJ2S-zBFRyvVLdeFk",
    authDomain: "halecoin-hackuci2018.firebaseapp.com",
    databaseURL: "https://halecoin-hackuci2018.firebaseio.com",
    projectId: "halecoin-hackuci2018",
    storageBucket: "halecoin-hackuci2018.appspot.com",
    messagingSenderId: "680173573393"
};
var fire = firebase.initializeApp(config);
export default fire;