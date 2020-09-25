import firebase from 'firebase/app';
import 'firebase/firestore';

// Initialize firebase app
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDR-TdlARKxyZjx9FBvJ3COsvja8j2mwxE",
    authDomain: "vue-form-save.firebaseapp.com",
    databaseURL: "https://vue-form-save.firebaseio.com",
    projectId: "vue-form-save",
    storageBucket: "vue-form-save.appspot.com",
    messagingSenderId: "101201561341",
    appId: "1:101201561341:web:b1ee2d29cb1516891ce094",
    measurementId: "G-3JQDDM1BWB"
});

const db = firebaseApp.firestore();

// Export the database for components to use.
export { db };