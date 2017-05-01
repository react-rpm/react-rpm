import React, { PropTypes } from 'react';
import styles from './styles/displayed_graphs.css';

const DisplayedGraphs = (props) => {

  const componentsActiveOnGraphs = props.componentsActiveOnGraphs;
  const updateGraph = props.updateGraph;
  const getComponent = props.getComponent;
  let tabArray = [];
  let whichGraph;

  const handleClick = (name, metric, activeGraphs) => {
    console.log('handle click!');
    let thisComponent = getComponent(name)
    console.log('!@!#!@#@!',typeof thisComponent);
    thisComponent.toggleActiveMetric('RENDER', metric, activeGraphs);
    updateGraph();
  }

  if(componentsActiveOnGraphs) {
    componentsActiveOnGraphs.forEach(component =>{

      component.activeGraphs === 0 ? whichGraph = '' : whichGraph = 'Secondary';
      tabArray.push(
        <div 
          onClick={()=>{handleClick(component.name, component.metric, component.activeGraphs)}} 
          className={styles.tab} 
          style={{'background':component.colorTheme}}>

          <span>{component.name+": "+component.metric+' ('+whichGraph+' '+component.graphDisplay+' graph)'}</span>
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
