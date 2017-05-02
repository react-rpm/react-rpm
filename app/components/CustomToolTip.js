import React, { PropTypes } from 'react';

const CustomToolTip = props => {
  const { componentsActiveOnGraphs, dataItems, getComponent } = props;

  var toolTipDisplay = []; 
  // container to hold elements to be rendered
  // if tool tip is 'selected', push to this array
  // time wasted = data[name]

  // call getComponent, get the whole perf component back 
  // get whatever is at index of 'label' which is a built in attribute by Recharts. plug this into the return of running getComponent

  console.log("we are in CustomToolTip.js, componentsActiveOnGraphs[0]['name'] looks like", componentsActiveOnGraphs[0]['name']);
  console.log("we are in CustomToolTip.js, componentsActiveOnGraphs[0]['metric'] looks like", componentsActiveOnGraphs[0]['metric']);
  
  var result = getComponent(componentsActiveOnGraphs[0]['name'],componentsActiveOnGraphs[0]['metric']);
  console.log("we are in CustomToolTip.js, result looks like", result);
  console.log("we are in CustomToolTip.js, result['label'] looks like", result['label']);

  for (var i = 0; i < dataItems.length; i++) {
    if (dataItems[i]['selected'] === true) {
      toolTipDisplay.push(<p className="tool-tip-item">{dataItems[i]['label']}</p>);
      // console.log('componentsActiveOnGraphs', componentsActiveOnGraphs[i]['metric']);
    }
  }

  for (var j = 0; j < componentsActiveOnGraphs.length; j++){
    // console.log("we are looping through componentsActiveOnGraphs", componentsActiveOnGraphs[j]);
  }

  return (
    <div className="custom-tooltip">
      {toolTipDisplay}
    </div>
  );
};

export default CustomToolTip;
