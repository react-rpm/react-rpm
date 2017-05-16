import React, { Component } from 'react';
import { render } from 'react-dom';
import ComponentView from './ComponentView';
import ViewController from './../components/ViewController';
import ProfileView from './ProfileView';
import ReactTransition from 'react-transition-group/CSSTransitionGroup';
import transitions from './../assets/transitions.css';
import styles from './../assets/app.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.haveReceivedPerfs = false;

    this.profileVisibility;
    this.componentVisibility;

    this.state = {
      view: 'componentView',
      appActive: true,
      perfData: {},
    };

    this.listenForPerfs();
    this.message = [];
    this.logo = (<img src={require('./../assets/images/tachometer.png')} id={styles.rpm_logo} />);
  }

  listenForPerfs() {
    const backgroundPageConnection = chrome.runtime.connect({
      name: "panel"
    });
    backgroundPageConnection.postMessage({
      name: 'init',
      tabId: chrome.devtools.inspectedWindow.tabId
    });
    backgroundPageConnection.onMessage.addListener(message => {
      if (!this.haveReceivedPerfs) {
        this.haveReceivedPerfs = true;
      }
      this.setState({ perfData: message.message });
    });
  }

  handleClick = () => {
    let appActive;
    if (!this.state.appActive) {
      this.message = [];
      this.message.push(this.buildMessage('listening'));
      appActive = !this.state.appActive;
    }
    this.setState({ appActive });
  }

  buildMessage = (message) => {
    if (message === 'toggleMessage')
      return (<div key={1} id={styles.toggleMessage} onClick={this.handleClick}>Click here to begin listening for renders</div>)
    if (message === 'listening') {
      return (<div key={10000} id={styles.listening}>React RPM is listening for renders...</div>)
    }
  }

  toggleViewHandler = () => {
    let appView
    this.state.view === 'componentView'
      ? appView = 'profileView'
      : appView = 'componentView'
    this.setState({ view: appView });
  }

  render() {

    let message = [];
    let componentView = [];
    let profileView = [];
    let viewController = [];

    if (this.state.appActive) {
      if (this.haveReceivedPerfs) {
        this.message = [];
        this.state.view === 'profileView' 
        ? [this.profileVisibility, this.componentVisibility] = [true, false]
        : [this.profileVisibility, this.componentVisibility] = [false, true]

        viewController = (<ViewController selectedView={this.state.view} 
        
        toggleViewHandler={this.toggleViewHandler}/>);

        componentView = (<ComponentView key={1} componentVisibility={this.componentVisibility} perfData={this.state.perfData} />);

        profileView = (<ProfileView key={2} profileVisibility={this.profileVisibility} newPerfs={this.state.perfData} />);
        
      }
    }
    else this.message.push(this.buildMessage('toggleMessage'));

    return (
      <div id={styles.main_container}>
        {viewController}
        <div 
          id={styles.bannerContainer}>
          <span id={styles.bannerText} 
          >react rpm | real-time performance metrics</span>
        </div>
        {this.logo}
        <div id={styles.message_container}>
          <ReactTransition
            transitionName={transitions}
            transitionAppear={true}
            transitionAppearTimeout={3000} transitionEnterTimeout={2000} transitionLeaveTimeout={300}>
            {this.message}
          </ReactTransition>
        </div>
        {profileView}
        {componentView}
      </div>
    )
  }
}

export default App;

