// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
//*allow us to connect database
import {getFirestore} from 'firebase/firestore';

// * for our Auth
import {getAuth} from 'firebase/auth'

// for storage
import {getStorage} from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDMAbXD56wy_9JxMi8TcvDe1bQCDb2HIfY",
  authDomain: "thenetwork-ec36f.firebaseapp.com",
  projectId: "thenetwork-ec36f",
  storageBucket: "thenetwork-ec36f.appspot.com",
  messagingSenderId: "805480000605",
  appId: "1:805480000605:web:35a0d09d9a2d67b52e71b4",
  measurementId: "G-HZ3TVF1X56"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// *set up database and export it 
export const db = getFirestore(app);

//* set up auth and export it

export const auth = getAuth(app);

//* set up storage 
export const storage = getStorage(app);