import React, { PropTypes } from 'react';
import styles from './styles/customtooltip.css';

const CustomToolTip = props => {
  // container to hold elements to be rendered
  // if tool tip is 'selected', push to this array
  // time wasted = data[name]

  // call getComponent, get the whole perf component back 
  // get whatever is at index of 'label' which is a built in attribute by Recharts. plug this into the return of running getComponent

  const { type, //name of component
          payload, //value at the node user is looking at
          label, //render number (x axis)
          dataItems,
          getComponent
        } = props;

  let toolTipDisplay = [];
  let demDataPoints;



  dataItems.forEach(dataItem => {
    if (dataItem['selected']) {
      demDataPoints = getComponent(type, dataItem[label]);
      toolTipDisplay.push(
        <div>
          <p className={styles.dataItem}>{dataItem+': '+demDataPoints[label]}</p><br/>
        </div>
      )  
    }
  });
  
  // var result = getComponent(componentsActiveOnGraphs[0]['name'],componentsActiveOnGraphs[0]['metric']);

  // for (var i = 0; i < dataItems.length; i++) {
  //   if (dataItems[i]['selected'] === true) {
  //     toolTipDisplay.push(<p className="tool-tip-item">{dataItems[i]['label']}</p>);
  //     // console.log('componentsActiveOnGraphs', componentsActiveOnGraphs[i]['metric']);
  //   }
  // }

  // for (var j = 0; j < componentsActiveOnGraphs.length; j++){
  //   // console.log("we are looping through componentsActiveOnGraphs", componentsActiveOnGraphs[j]);
  // }

  return (
    <div id={styles.tooltipContainer}>
      <p id={styles.type}>{type}</p><br/>
      <p id={styles.graphData}>{payload}</p><br/>
      {/*{toolTipDisplay}*/}
    </div>
  );
};

export default CustomToolTip;