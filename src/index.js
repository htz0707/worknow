import React, { useState } from 'react';
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
import { Helmet, HelmetProvider } from 'react-helmet-async';
import TagManager from 'react-gtm-module';

//init google tag manager
const tagManagerArgs = {
  gtmId: process.env.REACT_APP_GTM_ID,
};
TagManager.initialize(tagManagerArgs);
//init sentry
Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DNS,
  integrations: [new BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

const root = ReactDOM.createRoot(document.getElementById('root'));
//init graphql
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
//init helmet
const helmetContext = {};
root.render(
  <ProSidebarProvider>
    <I18nextProvider i18n={i18n}>
      <ApolloProvider client={client}>
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
          <HelmetProvider context={helmetContext}>
            <Helmet>
              <title>WorkNow</title>
            </Helmet>
            <App />
          </HelmetProvider>
        </GoogleOAuthProvider>
      </ApolloProvider>
    </I18nextProvider>
  </ProSidebarProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
