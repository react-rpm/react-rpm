import React, { Component } from 'react';
import styles from './styles/toolbar.css';
import GraphPicker from './GraphPicker';
import DisplayedGraphs from './DisplayedGraphs'

const ProfileToolbar = (props) => {
  const {
        tooltipValues,
        toggleTooltipValues,
        allComponents,
        twoGraphsAreActive,
        twoGraphToggler,
        updateGraph,
        componentsActiveOnGraphs,
        getComponent
      } = props;

  return (
    <div>
      <div id={styles.toolbarContainer}>
        <div className={styles.toolbarPanel}>
          <div className={styles.toolbarPanelTitle}>
            <span>Displayed Graphs</span>
            <DisplayedGraphs
              componentsActiveOnGraphs={componentsActiveOnGraphs}
              updateGraph={updateGraph}
              getComponent={getComponent}
            />
          </div>
        </div>
        <div className={styles.toolbarPanel}>
          <div className={styles.toolbarPanelTitle}>
            <span>Graph Selector</span>
            <GraphPicker
              allComponents={allComponents}
              twoGraphsAreActive={twoGraphsAreActive}
              updateGraph={updateGraph}
              twoGraphToggler={twoGraphToggler}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileToolbar;
