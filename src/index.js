import React from 'react';
import ReactDOM from 'react-dom/client';
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
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

Sentry.init({
  dsn: "https://0ea7fc0daeb84fd6ad3f656ec5cf362e@o4504121129304064.ingest.sentry.io/4504614273155072",
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
        <App />
      </ApolloProvider>
    </I18nextProvider>
  </ProSidebarProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
