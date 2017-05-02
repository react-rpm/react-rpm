import React, { PropTypes } from 'react';

// get 'selected' prop from dataItems
// build out an array of p's, is time wasted true or false in dataItems?
// declare an array

const CustomToolTip = props => {
  const { componentsActiveOnGraphs, dataItems } = props;

  var toolTipDisplay = []; // this is what will berender
  // if tool til is active, push p to it
  // time wasted = data[name]

  for (var i = 0; i < dataItems.length; i++) {
    if (dataItems[i]['selected'] === true) {
      toolTipDisplay.push(<p className="tool-tip-item">{dataItems[i]['label']}</p>);
      // console.log('componentsActiveOnGraphs', componentsActiveOnGraphs[i]['metric']);
    }
  }

  for (var j = 0; j < componentsActiveOnGraphs.length; j++){
    console.log("we are looping through componentsActiveOnGraphs", componentsActiveOnGraphs[j]);
  }

  // console.log(
  //   'componentsActiveOnGraphs in CustomToolTips.js is',
  //   componentsActiveOnGraphs
  // );
  // console.log('dataItems in CustomToolTips.js is', dataItems);

  console.log('toolTipDisplay in CustomToolTips.js is', toolTipDisplay);
  return (
    <div className="custom-tooltip">
      {toolTipDisplay}
    </div>
  );
};

export default CustomToolTip;
