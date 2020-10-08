import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBdN_1E5M-hMijOCIxZdLnVj0YCiluZKMo",
  authDomain: "todo-app-ed4be.firebaseapp.com",
  databaseURL: "https://todo-app-ed4be.firebaseio.com",
  projectId: "todo-app-ed4be",
  storageBucket: "todo-app-ed4be.appspot.com",
  messagingSenderId: "757085918072",
  appId: "1:757085918072:web:de10bfeec332c9ce516e8d",
  measurementId: "G-M246C9XQBZ",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
