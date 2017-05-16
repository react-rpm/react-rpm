import React from 'react';
import PropTypes from 'prop-types';
import styles from './../assets/viewcontroller.css';

const ViewController = (props) => {

  const {selectedView, toggleViewHandler} = props;

  let selectedClass, selectedText, profileClickHandler, componentClickHandler
  let [profileText, componentText] = ['<<< go to profile view', 'go to component view >>>']

  selectedView === 'profileView'
    ? [selectedClass, selectedText, profileClickHandler, componentClickHandler] = [styles.profile, 'profile view', '', toggleViewHandler ]
    : [selectedClass, selectedText, profileClickHandler, componentClickHandler]  = [styles.component, 'component view', toggleViewHandler, '']

  return (
  
    <div id={styles.viewControllerContainer}>
      <div 
        className={selectedClass}
      >
        <span className={styles.text}>{selectedText}</span>
      </div>
      <div 
        id={styles.goToProfile}
        onClick={profileClickHandler}
      >
        <span className={styles.text}>{profileText}</span>
      </div>
      <div 
        id={styles.goToComponent}
        onClick={componentClickHandler}
      >
        <span className={styles.text}>{componentText}</span>
      </div>
    </div>
  )
}

export default ViewController;