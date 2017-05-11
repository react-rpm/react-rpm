import React, { Component } from 'react';
import Visualizer from '../components/Visualizer';
import styles from './../components/styles/app.css';

class App extends Component {

  render() {
    console.log("made it to app!");
    return (
      <Visualizer perfs={this.props.perfs} />
    )
  }
}
