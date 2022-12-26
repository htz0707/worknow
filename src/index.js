import React from 'react';
import ReactDOM from 'react-dom/client';
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
  <I18nextProvider i18n={i18n}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </I18nextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
