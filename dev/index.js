import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import App from '../../../app/containers/App';

console.log('hello');

render(
  <App/>,
  document.getElementById('root')
);
