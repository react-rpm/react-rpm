import React, { Component } from 'react';
import { render } from 'react-dom';
import Visualizer from '../components/Visualizer';
import styles from './../components/styles/app.css';

let perfs;

const App = render(
  <Visualizer perfs={perfs} />
)

var backgroundPageConnection = chrome.runtime.connect({
    name: "panel"
});

backgroundPageConnection.postMessage({
    name: 'init',
    tabId: chrome.devtools.inspectedWindow.tabId
});
backgroundPageConnection.onMessage.addListener(function (message) {
    console.log('DevPanel received a message:',message);
    App.setProps({perfs: message})

});