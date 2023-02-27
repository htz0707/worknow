// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDrgqN55Yu90gPGHJbbaWIDvctWYo86cEc',
  authDomain: 'ambient-odyssey-372104.firebaseapp.com',
  databaseURL: 'https://ambient-odyssey-372104-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'ambient-odyssey-372104',
  storageBucket: 'ambient-odyssey-372104.appspot.com',
  messagingSenderId: '988313835315',
  appId: '1:988313835315:web:43f626eba25003406ad046',
  measurementId: 'G-8XV5P140DN'
};

const app = initializeApp(firebaseConfig);

// Initialize Firebase
const messaging = getMessaging(app);
// Add the public key generated from the console here.

const getFCMToken = async () => {
  const token = await getToken(messaging, { vapidKey: 'BNu2_4R6cOymrW0fsiuDR-5nBZOxWrSP7pGptgE3v6DAzEsFJAwhtBJscvJcTWnE2r7dZFuqL37HhTJ118wUmRM' })
  console.log(token);
}

getFCMToken();

export const fetchToken = (setTokenFound) => {
  return getToken(messaging, { vapidKey: 'BHGPr3pJQSflJAJtTIVXbmcEXlPV_HP29TZQRcqrGCN10gKIa-ojIJmtvM9kQGcsNKsWIA6ezKFG8Bd6LTjaVc0' }).then((currentToken) => {
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