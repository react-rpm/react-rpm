import React, { Component } from 'react';
import styles from './../assets/toolbar.css';
import GraphPicker from './GraphPicker';
import DisplayedGraphs from './DisplayedGraphs'

const Toolbar = (props) => {
  const {
        //Graph Selector
        allComponents,
        twoGraphsAreActive,
        twoGraphToggler,
        updateGraph,
  
        //For DisplayedGraphs
        componentsActiveOnGraphs,
        getComponent,

        compileGraphData
      } = props;

  return (
    <div>

      <div id={styles.toolbarContainer}>

        <div className={styles.displayedGraphsContainer}>
          <DisplayedGraphs 
            componentsActiveOnGraphs={componentsActiveOnGraphs}
            updateGraph={updateGraph}
            getComponent={getComponent}
            compileGraphData={compileGraphData}
          >
          </DisplayedGraphs>
        </div>

        <div id={styles.toolbarSwitchContainer}>
          <div className={styles.toolbarPanelTitle}>
            <span>Sorted</span>
          </div>

          <div className={styles.toolbarPanelTitle}>
           <span>Custom</span>
          </div>
        </div>

        <div className={styles.toolbarPanel}>
          <GraphPicker 
            allComponents={allComponents} 
            twoGraphsAreActive={twoGraphsAreActive}
            updateGraph={updateGraph}
            twoGraphToggler={twoGraphToggler}
          />
        </div>

        {/*<div 
          id={styles.modify} className={styles.toolbarPanel}
        >
           <div className={styles.toolbarPanelTitle}>
            <span>Sorted</span>
          </div>
        </div>*/}

      </div>
    </div>
  )
}

export default Toolbar;
