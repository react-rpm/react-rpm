import 'babel-polyfill';
import React, { Component } from 'react';
import { render } from 'react-dom';
import Visualizer from '../../../app/components/Visualizer';
import styles from '../../../app/components/styles/app.css';

render(
  <Visualizer />,
  document.getElementById('root')
)



