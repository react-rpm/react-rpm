import React from 'react';
import PropTypes from 'prop-types';
import ReactTransition from 'react-transition-group/CSSTransitionGroup';
import styles from './../assets/displayed_graphs.css';
import transitions from './../assets/DisplayGraph_transitions.css';
import { colors } from './../assets/colors.js';

const DisplayedGraphs = (props) => {

  const componentsActiveOnGraphs = props.componentsActiveOnGraphs;
  const updateGraph = props.updateGraph;
  const getComponent = props.getComponent;
  let tabArray = [];
  let whichGraph;

  const handleClick = (name, metric, activeGraphs) => {
    let thisComponent = getComponent(name)
    thisComponent.toggleActiveMetric('RENDER', metric, activeGraphs);
    updateGraph();
  }

  if(componentsActiveOnGraphs) {
    componentsActiveOnGraphs.forEach((component,i) =>{

      component.activeGraphs === 0 ? whichGraph = '' : whichGraph = 'Secondary ';
      tabArray.push(
        <div
          key={i}  
          className={styles.tab}>
          <div className={styles.colorCircle} style={{'background':colors[component.colorTheme]}}/>
          <span> {component.name+": "+component.metric}</span>
          <div 
            className={styles.deleteButton}
            onClick={()=>{handleClick(component.name, component.metric, component.activeGraphs)}}
            >
            X
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
