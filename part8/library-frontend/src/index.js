import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { ApolloProvider, ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities';
import { setContext } from 'apollo-link-context'
import { WebSocketLink } from '@apollo/client/link/ws';

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('logged-in-user')

  return { 
    headers: {
      ...headers, 
      authorization: token ? `bearer ${token}` : null,
    }
  }
})

const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/graphql`,
  options: {
    reconnect: true
  }
})

const httpLink = new HttpLink({ uri: 'http://localhost:4000/' })

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription' 
    );
  },
  wsLink, // * The Link to use for an operation if the function returns a "truthy" value
  authLink.concat(httpLink), // * The Link to use for an operation if the function returns a "falsy" value
);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'))