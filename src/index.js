import React from 'react';
import ReactDOM from 'react-dom/client';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import i18n from './translation/i18n';
import { I18nextProvider } from 'react-i18next';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { ProSidebarProvider } from 'react-pro-sidebar';
import { GoogleOAuthProvider } from '@react-oauth/google';

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

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DEV_DNS,
  integrations: [new BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

const root = ReactDOM.createRoot(document.getElementById('root'));
const httpLink = createHttpLink({
  uri: process.env.REACT_APP_API_URL,
});
const authLink = setContext((_, { headers }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (headers?.noToken) {
    return {
      headers: {
        ...headers,
      },
    };
  } else {
    return {
      headers: {
        ...headers,
        authorization: user ? `Bearer ${user.token}` : '',
      },
    };
  }
});
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
root.render(
  <ProSidebarProvider>
    <I18nextProvider i18n={i18n}>
      <ApolloProvider client={client}>
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
          <App />
        </GoogleOAuthProvider>
      </ApolloProvider>
    </I18nextProvider>
  </ProSidebarProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
