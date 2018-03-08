import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';
import App from './views/App';
import appState from './store/app-state';

const render = window.location.port === '8888' ? ReactDOM.render : ReactDOM.hydrate;
render(
  <Provider appState={appState}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
