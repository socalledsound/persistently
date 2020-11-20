// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCcvquhO2CGo8zyIH9hGx54NN1ADeA65vg",
    authDomain: "persistently-4625f.firebaseapp.com",
    databaseURL: "https://persistently-4625f.firebaseio.com",
    projectId: "persistently-4625f",
    storageBucket: "persistently-4625f.appspot.com",
    messagingSenderId: "526323833103",
    appId: "1:526323833103:web:93182b3faf5f09c571867a"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    const db = firebase.firestore();
    db.settings({ timestampsInSnapshots: true});

    form = document.querySelector('#add-message-form')