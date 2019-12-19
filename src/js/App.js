import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import MyBooks from './components/MyBooks';
import FindBooks from './components/FindBooks';
import AnnualReport from './components/AnnualReport';

const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
};

const httpLink = createHttpLink( {
  uri: '/graphql',
} );

const client = new ApolloClient( {
  link: httpLink,
  defaultOptions: defaultOptions,
  cache: new InMemoryCache(),
} );

const App = () => (
  <BrowserRouter>
    <ApolloProvider client={client}>
      <Switch>

        <Redirect path="/" to="/MyBooks" exact />

        <Route path="/MyBooks" component={MyBooks} />
        <Route path="/FindBooks/:queryString" component={FindBooks} />
        <Route path="/AnnualReport" component={AnnualReport} />

      </Switch>
    </ApolloProvider>
  </BrowserRouter>
);

export default App;
