import React, { PropTypes } from 'react';

const CustomToolTip = props => {
  // bring in props from Plot
  // const { componentsActiveOnGraphs, dataItems } = props;

  // how do i log the values?
  // get 'selected' prop from dataItems
  // build out an array of p's, is time wasted true or false in dataItems?
  // declare an array

  var toolTipDisplay = []; //this is what will berender
  // if tool til is active, push p to it
  // time wasted = data[name]

  return (
    <div className="custom-tooltip">
      <p className="tool-tip-0">Test1</p>
      <p className="tool-tip-1">Test2</p>
      <p className="tool-tip-2">Test3</p>
      <p className="tool-tip-3">Test4</p>
      <p className="tool-tip-4">Test5</p>
      <p className="tool-tip-5">Test6</p>
      <p className="tool-tip-6">Test7</p>
    </div>
  );
};

//  dataItems: [
//  { id: 0, selected: true, label: 'Time Wasted' },
//  { id: 1, selected: false, label: 'Instance Count' },
//  { id: 2, selected: false, label: 'Render Count' },
//  { id: 3, selected: false, label: 'Render Time' },
//  { id: 4, selected: false, label: 'Total Render Time' },
//  { id: 5, selected: false, label: 'Avg Render Time' },
//  { id: 6, selected: false, label: 'Total Time' },
//  ]

//  <p className="tool-tip-3">{`${label} : ${payload[0].value}`}</p>
//  <p className="tool-tip-4">{this.getIntroOfPage(label)}</p>7/

// Array of objects, with the following keys:
//   name: [component name],
//   metric: [metric name],
//   activeGraphs: [0 or 1],
//   data: [array of plot points];

export default CustomToolTip;