// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyANgYOG_UtpcKUPlMFQQttWEjJ0N4nynN8",
  authDomain: "uam-tcc-project.firebaseapp.com",
  databaseURL: "https://uam-tcc-project-default-rtdb.firebaseio.com",
  projectId: "uam-tcc-project",
  storageBucket: "uam-tcc-project.appspot.com",
  messagingSenderId: "47979866010",
  appId: "1:47979866010:web:ac92553f1337a68b087c23"
};

// Initialize Firebase
let app;
if(firebase.apps.length === 0 ){
    app = firebase.initializeApp(firebaseConfig)
}else{
    app = firebase.app()
}

const auth = firebase.auth()
export { auth };