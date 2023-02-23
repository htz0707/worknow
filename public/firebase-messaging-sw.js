// Scripts for firebase and firebase messaging
importScripts(
  'https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js'
);
importScripts(
  'https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js'
);

// Initialize the Firebase app in the service worker by passing the generated config
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

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
