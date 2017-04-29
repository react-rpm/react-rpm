import React, { PropTypes } from 'react';
import styles from './styles/toolbar.css'

const Toolbar = (props) => {

  const {
        tooltipValues,
        toggleTooltipValues
  } = props;

  return (
    <div>
      <div id={styles.toolbarContainer}>
        <div className={styles.toolbarPanel}>
          <div className={styles.toolbarPanelTitle}>
            <span>Displayed Graphs</span>
          </div>
        </div>
        <div className={styles.toolbarPanel}>
          <div className={styles.toolbarPanelTitle}>
            <span>Graph Selector</span>
          </div>
        </div>
      </div>
    </div>
  )
}




export default Toolbar;
