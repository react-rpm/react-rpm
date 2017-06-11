import React from 'react';
import PropTypes from 'prop-types';
import ReactTransition from 'react-transition-group/CSSTransitionGroup';
import styles from './../assets/displayed_graphs.css';
import transitions from './../assets/DisplayGraph_transitions.css';
import { colors } from './../assets/colors.js';

const DisplayedGraphs = (props) => {

  const {componentsActiveOnGraphs, updateGraph, getComponent, twoGraphToggler} = props;
  let tabArray = [];
  let whichGraph;

  const handleClick = (name, metric, activeGraphs) => {
    let thisComponent = getComponent(name)
    thisComponent.toggleActiveMetric('RENDER', metric, activeGraphs);
    if (activeGraphs) {}
    updateGraph();
  }

  if(componentsActiveOnGraphs) {
    componentsActiveOnGraphs.forEach((component,i) =>{

      whichGraph = component.activeGraphs === 0 ? 'I' : 'II'
      tabArray.push(
        <div>
          <div
            key={i}  
            className={styles.tab}>
            <div className={styles.colorCircle} style={{'background':component.colorTheme}}/>
            <span> {'Name: '+component.name}</span>
            <span> {'Metric: '+component.metric}</span>
            <span> {'Graph: '+whichGraph}</span>
            <button
              className={styles.deleteButton}
              onClick={()=>{handleClick(component.name, component.metric, component.activeGraphs)}}
              >
              X
            </button>
          </div>
        </div>
      )
    })
  }

  return (
    <div className={styles.tabContainer}>
      <ReactTransition
          transitionName={transitions} transitionEnterTimeout={1500} transitionLeaveTimeout={1350}>    
          {tabArray}
      </ReactTransition>
    </div>
  )
  


}


 
export default DisplayedGraphs;
