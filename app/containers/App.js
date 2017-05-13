import React, { Component } from 'react';
import { render } from 'react-dom';
import Visualizer from '../components/Visualizer';
import styles from './styles/app.css';
import transitions from './styles/transitions.css';
import ReactTransition from 'react-transition-group/CSSTransitionGroup';

class App extends Component {
  constructor(props) {
    super(props);

    this.haveReceivedPerfs = false;

    this.state = {
      view: 'componentView',
      appActive: false,
      perfData: {},
    };

    this.animations = {
      fadeOut: 'styles.fadeOut',
      fadeIn: 'styles.fadeIn'
    }
    
    this.listenForPerfs();
    this.message = [];
  }

  listenForPerfs(){
    const backgroundPageConnection = chrome.runtime.connect({
      name: "panel"
    });

    backgroundPageConnection.postMessage({
      name: 'init',
      tabId: chrome.devtools.inspectedWindow.tabId
    });
    backgroundPageConnection.onMessage.addListener(message => {
      console.log('[APP]\n Received Perfs...\n', message);
      if (!this.haveReceivedPerfs) this.haveReceivedPerfs = true;
      this.setState({perfData: message.message});
    });
  }

  handleClick(){
    let appActive;
    if (!this.state.appActive) {
      this.message = [];
      this.message.push(this.buildMessage('listening'));
      appActive = !this.state.appActive;
    }
    this.setState({appActive});
  }

  buildMessage(message) {
    if (message === 'toggleMessage') 
      return (<div key={1} id={styles.toggleMessage} onClick={this.handleClick.bind(this)}>Click here to begin listening for renders</div>)
    if (message === 'listening'){
      return (<div key={10000} id={styles.listening}>React RPM is listening for renders...</div>)
    }
  }

  toggleAppView(){
    let appView;
    this.state.view === 'componentView'
      ? appView === 'profileView'
      : appView === 'componentView'
    this.setState({view: appView});
  }

  render() {

    let currentView = '';

    if (this.state.appActive) {
      if (this.haveReceivedPerfs) { this.message = [];
        if (this.state.view === 'componentView') 
          currentView = ( <Visualizer perfData={this.state.perfData}/> )
      }
    }
    else this.message.push(this.buildMessage('toggleMessage'));

    console.log('currentView:',currentView)

    return (
      <div id={styles.main_container}>
        <div id={styles.bannerContainer}>react rpm | real-time performance metrics</div>
        <img src={require('./../components/styles/tachometer.png')} id={styles.rpm_logo}/>
        <div id={styles.message_container}>
          <ReactTransition 
            transitionName={transitions}
            transitionAppear={true}
            transitionAppearTimeout={3000} transitionEnterTimeout={2000} transitionLeaveTimeout={300}>
            {this.message}
          </ReactTransition>
        </div>
        {currentView}
      </div>
    )
  }
}

export default App;