import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

const render = window.location.port === '8888' ? ReactDOM.render : ReactDOM.hydrate;
render(<App />, document.getElementById('root'));
