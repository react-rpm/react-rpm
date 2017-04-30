import React, { PropTypes } from 'react';
import styles from './styles/toolbar.css'
import GraphsDisplayedData from './GraphsDisplayedData';

const Toolbar = (props) => {

  const {
        tooltipValues,
        toggleTooltipValues,
        componentsActiveOnGraphs,
        removeActiveComponentFromGraph

  } = props;

  return (
    <div>
      <div id={styles.toolbarContainer}>
        <div className={styles.toolbarPanel}>
          <div className={styles.toolbarPanelTitle}>
            <span>Displayed Graphs</span>
          </div>
          <GraphsDisplayedData
            componentsActiveOnGraphs={componentsActiveOnGraphs}
            removeActiveComponentFromGraph={removeActiveComponentFromGraph}
            />
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

//Component:
//Metric:
//Line Style:
//Line Color:
//[OPTIONAL] Graph Display:
//RENDER ON GRAPH!


export default Toolbar;
