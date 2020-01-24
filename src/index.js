import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, createClient } from 'urql';

import App from './App';

const client = createClient({
  url: 'https://react.eogresources.com/graphql',
});


ReactDOM.render(
  <Provider value={client}>
    <App />
  </Provider>,
  document.getElementById('root'));
