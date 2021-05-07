import  firebase  from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyDJ-yTss88EOrKoG4uVNb6AAw1AJO2_ZuM",
    authDomain: "testing-db-15758.firebaseapp.com",
    databaseURL: "https://testing-db-15758-default-rtdb.firebaseio.com",
    projectId: "testing-db-15758",
    storageBucket: "testing-db-15758.appspot.com",
    messagingSenderId: "1080836774744",
    appId: "1:1080836774744:web:1ee02128e6ecb2cc6f632d",
    measurementId: "G-DPBYB4KD3P"
};

const firebaseApp=firebase.initializeApp(firebaseConfig);
const db=firebaseApp.firestore();

export default db;