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
        <div className={styles.toolbarPanel} id={styles.createPanel}>
          <div id={styles.create} className={styles.toolbarPanelTitle}>
            <span>Metric Selector</span>
            <GraphPicker 
              allComponents={allComponents} 
              twoGraphsAreActive={twoGraphsAreActive}
              updateGraph={updateGraph}
              twoGraphToggler={twoGraphToggler}
              componentsActiveOnGraphs={componentsActiveOnGraphs}
              />
          </div>
        </div>
        <div id={styles.modify} className={styles.toolbarPanel}>
          <div>
            <span
              style={{
                display:'block',
                margin: '10px auto 0 auto',
                width:'fit-content'
              }}
            >Displayed Metrics</span>
          </div>
          <DisplayedGraphs 
          componentsActiveOnGraphs={componentsActiveOnGraphs}
          updateGraph={updateGraph}
          getComponent={getComponent}
          compileGraphData={compileGraphData}
          twoGraphToggler={twoGraphToggler}
          />
        </div>
      </div>
    </div>
  )
}

export default Toolbar;
