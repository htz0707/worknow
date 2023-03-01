import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyDrgqN55Yu90gPGHJbbaWIDvctWYo86cEc",
  authDomain: "ambient-odyssey-372104.firebaseapp.com",
  databaseURL: "https://ambient-odyssey-372104-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ambient-odyssey-372104",
  storageBucket: "ambient-odyssey-372104.appspot.com",
  messagingSenderId: "988313835315",
  appId: "1:988313835315:web:43f626eba25003406ad046",
  measurementId: "G-8XV5P140DN"
};

const app = initializeApp(firebaseConfig);

const messaging = getMessaging(app);

export const fetchToken = (setTokenFound) => {
  return getToken(messaging, { vapidKey: process.env.REACT_APP_FIREBASE_CLOUD_MESSAGING_KEY_PAIR }).then((currentToken) => {
    if (currentToken) {
      console.log('current token for client: ', currentToken);
      setTokenFound(true);
      // Track the token -> client mapping, by sending to backend server
      // show on the UI that permission is secured
    } else {
      console.log('No registration token available. Request permission to generate one.');
      setTokenFound(false);
      // shows on the UI that permission is required 
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    // catch error while creating client token
  });
}

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });