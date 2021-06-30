import firebase from "firebase/app";
import "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA9QC4IKUyUwMAxrh-iSe0l0zwtUvt5MeA",
  authDomain: "njoy-react-mern.firebaseapp.com",
  projectId: "njoy-react-mern",
  storageBucket: "njoy-react-mern.appspot.com",
  messagingSenderId: "311172043403",
  appId: "1:311172043403:web:d70ee2a438db62c2437a8e",
  measurementId: "G-7PYNTW9CDR",
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
