import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyCbRWR8_d8d9CUq3lyfkHryJr82coB0yNA",
    authDomain: "next-2c39b.firebaseapp.com",
    projectId: "next-2c39b",
    storageBucket: "next-2c39b.appspot.com",
    messagingSenderId: "308196675345",
    appId: "1:308196675345:web:175a88014fdfb475d106b0"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
firebaseApp.serverTimestamp = firebase.firestore.FieldValue.serverTimestamp()

export default firebaseApp;