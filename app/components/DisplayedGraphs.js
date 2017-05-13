import React, { PropTypes } from 'react';
import styles from './styles/displayed_graphs.css';
import { colors } from './styles/colors.js';

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
          onClick={()=>{handleClick(component.name, component.metric, component.activeGraphs)}} 
          className={styles.tab} 
          style={{'background':colors[component.colorTheme]}}>

          <span> {component.name+": "+component.metric+' ('+whichGraph+''+component.graphDisplay+')'}</span>
        </div>
      )
    })
  }

  return (
    <div>
      {tabArray}
    </div>
  )
  


}


 
export default DisplayedGraphs;
