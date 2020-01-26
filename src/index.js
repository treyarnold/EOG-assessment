import React from 'react';
import ReactDOM from 'react-dom';
import {
  Provider,
  createClient,
  defaultExchanges,
  subscriptionExchange
} from 'urql';
import { SubscriptionClient } from 'subscriptions-transport-ws';

import SubTest from './SubTest.jsx';

const subscriptionClient = new SubscriptionClient
  ('ws://react.eogresources.com/graphql', {});

const client = createClient({
  url: 'https://react.eogresources.com/graphql',
  exchanges: [
    ...defaultExchanges,
    subscriptionExchange({
      forwardSubscription: operation => subscriptionClient.request(operation)
    }),
  ],
});


ReactDOM.render(
  <Provider value={client}>
    <SubTest />
  </Provider>,
  document.getElementById('root'));
