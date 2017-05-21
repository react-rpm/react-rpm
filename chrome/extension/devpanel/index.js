import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import App from '../../../app/containers/App';
import 'react-hot-loader/patch';
import { AppContainer } from 'react-hot-loader';

render(
  <AppContainer>
    <App/>
  </AppContainer>,
  document.getElementById('root')
);
