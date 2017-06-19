import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import 'babel-polyfill';
import App from './../containers/App';
import 'react-hot-loader/patch';

render(
  <AppContainer>
    <App />
  </AppContainer>, document.getElementById('root')
);

if (module.hot && module.hot.accept('./../containers/App', () => {
  render(App)
}));
