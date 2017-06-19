/*es-lint enable*/

import React, { Component } from 'react';
import ReactTransition from 'react-transition-group/CSSTransitionGroup';
import ComponentView from './ComponentView';
import ViewController from './../components/ViewController';
import ProfileView from './ProfileView';
import transitions from './../assets/transitions.css';
import logoExitTransition from './../assets/logoExitTransition.css';
import styles from './../assets/app.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.haveReceivedPerfs = false;
    this.message = [];
    this.profileVisibility;
    this.componentVisibility;
    this.listenForPerfs();

    this.state = {
      view: 'componentView',
      appActive: true,
      perfData: {},
    };
    //NOTE: temporary fix to circumvent 'start' message. will refactor later!!
    this.message.push(this.buildMessage('listening'));
  }

  listenForPerfs() {
    const backgroundPageConnection = chrome.runtime.connect({
      name: 'panel',
    });
    backgroundPageConnection.postMessage({
      name: 'init',
      tabId: chrome.devtools.inspectedWindow.tabId,
    });
    backgroundPageConnection.onMessage.addListener((message) => {
      if(message.source === "react-rpm-module" && message.type != "webpackOk") {
        this.haveReceivedPerfs = true;
        this.hasRenderBeenDetected = styles.renderDetected;
        this.setState({ perfData: message.message });
      }
    });
  }

  buildMessage = (message) => {
    if (message === 'listening') {
      return (
        <div
          key={10000}
          id={styles.listening}
        >
          react-rpm is listening for renders...
        </div>
      );
    }
  }

  toggleViewHandler = () => {
    let appView = this.state.view === 'componentView' 
      ? 'profileView'
      : 'componentView'
    this.setState({ view: appView });
  }

  render() {
    let componentView = [];
    let profileView = [];
    let viewController = [];

    if (this.state.appActive) {
      if (this.haveReceivedPerfs) {
        this.message = [];
        if (this.state.view === 'profileView') [this.profileVisibility, this.componentVisibility] = [true, false];
        else [this.profileVisibility, this.componentVisibility] = [false, true];

        viewController = (
          <ViewController
            selectedView={this.state.view}
            toggleViewHandler={this.toggleViewHandler}
          />
        );
        componentView = (
          <ComponentView
            key={1}
            componentVisibility={this.componentVisibility}
            perfData={this.state.perfData}
          />
        );
        profileView =  (
          <ProfileView
            key={2}
            profileVisibility={this.profileVisibility}
            perfData={this.state.perfData}
          />
        )
      }
    }
    console.log('[Logging from App render]:\nthis.state.perfData:',this.state.perfData);
    return (
      <div id={styles.main_container}>
        <div id={styles.divider}></div>

        {viewController}
        <div 
          id={styles.bannerContainer}>

          <span 
            id={styles.bannerTitle}>
            {'react rpm  '}
          </span>

          <span id={styles.bannerByLine}>
            real-time performance metrics
          </span>

        </div>
        <div id={styles.message_container}>
          <ReactTransition
            transitionName={transitions}
            transitionAppear={true}
            transitionAppearTimeout={4500} transitionEnterTimeout={3000} transitionLeaveTimeout={300}>
            {this.message}
          </ReactTransition>
        </div>
        {/*<span id={styles.efficientMessage}>
          App is not registering any inefficiencies
        </span>*/}
        {profileView}
        {componentView}
      </div>
    );
  }
}



export default App;
