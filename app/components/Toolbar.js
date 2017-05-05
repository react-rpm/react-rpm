import React, { Component } from 'react';
import styles from './styles/toolbar.css';
import GraphPicker from './GraphPicker';
import DisplayedGraphs from './DisplayedGraphs'
require('./styles/bg_toolbar_texture.png');
require('./styles/bg_panel_texture.png');
require('./styles/bg_dataitem_texture.png');



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
        <div id={styles.toolbarToCenter}>
            
            
            <div className={styles.toolbarPanel}>
              <div className={styles.toolbarPanelTitle}>
                <span>GRAPH SELECTOR</span>
                <GraphPicker 
                  allComponents={allComponents} 
                  twoGraphsAreActive={twoGraphsAreActive}
                  updateGraph={updateGraph}
                  twoGraphToggler={twoGraphToggler}
                  />
              </div>
            </div>
            <div id={styles.spacer}></div>
            <div className={styles.toolbarPanel}>
              <div className={styles.toolbarPanelTitle}>
                <span> RENDERED</span>
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
