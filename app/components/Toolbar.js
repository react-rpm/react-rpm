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
            <div className={styles.toolbarPanel}>
              <div id={styles.create} className={styles.toolbarPanelTitle}>
                <span>Graph Selector</span>
                <GraphPicker 
                  allComponents={allComponents} 
                  twoGraphsAreActive={twoGraphsAreActive}
                  updateGraph={updateGraph}
                  twoGraphToggler={twoGraphToggler}
                  />
              </div>
            </div>
            <div id={styles.modify} className={styles.toolbarPanel}>
              <div className={styles.toolbarPanelTitle}>
                <span>Editor</span>
                <DisplayedGraphs 
                componentsActiveOnGraphs={componentsActiveOnGraphs}
                updateGraph={updateGraph}
                getComponent={getComponent}
                compileGraphData={compileGraphData}
                
                />
              </div>
            </div>
        </div>
    </div>
  )
}

export default Toolbar;
