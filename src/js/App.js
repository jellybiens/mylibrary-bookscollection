import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
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

const theme = createMuiTheme( {
  palette: {
    secondary: {
      main: green[500],
    },
  },
} );

const App = () => (
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <Switch>

          <Redirect path="/" to="/MyBooks" exact />

          <Route path="/MyBooks" component={MyBooks} />
          <Route path="/FindBooks/:queryString" component={FindBooks} />
          <Route path="/AnnualReport" component={AnnualReport} />

        </Switch>
      </ApolloProvider>
    </ThemeProvider>
  </BrowserRouter>
);

export default App;
