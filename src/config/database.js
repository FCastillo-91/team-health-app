import * as firebase from "firebase/app";
import "firebase/database";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_DB_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_DB_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DB_FIREBASE_URL,
  projectId: process.env.REACT_APP_DB_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_DB_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_DB_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_DB_FIREBASE_APP_ID,
};

firebase.initializeApp(firebaseConfig);

export const database = firebase.database();
