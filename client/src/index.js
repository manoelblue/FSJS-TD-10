import React from 'react';
import ReactDOM from 'react-dom';

import './css/reset.css';
import './css/global.css';

import { Provider } from './Context';
import App from './App';

ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById('root'));
