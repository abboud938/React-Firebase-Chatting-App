
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB99TNCR6TBiJ3noKD8-lgjeao2ELICwx4",
  authDomain: "reactchat-146e7.firebaseapp.com",
  projectId: "reactchat-146e7",
  storageBucket: "reactchat-146e7.appspot.com",
  messagingSenderId: "117716954401",
  appId: "1:117716954401:web:2d479033c0367405d2a260"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
export const getstorage = getStorage();