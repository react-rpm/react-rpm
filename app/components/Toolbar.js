import React, { Component } from 'react';
import styles from './styles/toolbar.css';
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

      console.log('\n\n\n\n\n logging from toolbar: \n',allComponents);

  return (
    <div>
      <div id={styles.toolbarContainer}>
            <div className={styles.toolbarPanel}>
              <div id={styles.create} className={styles.toolbarPanelTitle}>
                <span>Component View</span>
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
                <span>Profile View</span>
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

//Component:
//Metric:
//Line Style:
//Line Color:
//[OPTIONAL] Graph Display:
//RENDER ON GRAPH!


export default Toolbar;
