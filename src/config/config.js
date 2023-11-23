// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const ENV = import.meta.env
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: ENV.VITE_API_KEY,
  authDomain: ENV.VITE_AUTH_DOMAIN,
  projectId: ENV.VITE_PROJECT_ID,
  storageBucket: ENV.VITE_STORAGE_BUCKET,
  messagingSenderId: ENV.VITE_MESSAGING_SENDER_ID,
  appId: ENV.VITE_APP_ID,
  measurementId: ENV.VITE_MEASUREMENT_ID
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)