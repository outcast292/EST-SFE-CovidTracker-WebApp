import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyAWggXGkEl_gANHMtwmDY0gA8d6hTlGi4s",
    authDomain: "covid-tracer-274905.firebaseapp.com",
    databaseURL: "https://covid-tracer-274905.firebaseio.com",
    projectId: "covid-tracer-274905",
    storageBucket: "covid-tracer-274905.appspot.com",
    messagingSenderId: "540405409258",
    appId: "1:540405409258:web:63d0610fbd21664a1efe93",
    measurementId: "G-JDB70DS6RQ"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firestore = firebaseApp.firestore()
const auth = firebaseApp.auth()
const currentUser = auth.currentUser

export { firebaseApp, firestore , auth,currentUser};