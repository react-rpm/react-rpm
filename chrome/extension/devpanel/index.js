import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import Visualizer from '../../../app/components/Visualizer';

// import configureStore from '../../../app/store/configureStore';

// const store = configureStore();

render(
  <Visualizer/>,
  document.getElementById('root')
);
