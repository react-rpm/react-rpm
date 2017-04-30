import React, { PropTypes } from 'react';
import PerfComponent from './PerfComponent';
import styles from './styles/toolbar.css'


// METRIC FORMAT:
 // data: [],
 // median: 0,
 // min: 0,
 // max: 0,
 // graphDisplay: 'Line',
 // colorTheme: 'blue',
 // strokeWidth: 2,
 // dotColor: 'blue',
 // activeGraphs: {
 //   '0': false,
 //   '1': false
 // }



const GraphsDisplayedData = (props) => {

  const {
        componentsActiveOnGraphs,
        removeActiveComponentFromGraph,
        disableMetricOnGraph,
        getActiveMetrics,
        getMetricObject,

  } = props;

let activeGraphs = [];


// Object.keys(this[categoryTracker]).forEach(metric => {
//   if(this.RENDER[metric].activeGraphs[i]) {
//   }
// }
let active = PerfComponent.componentsActiveOnGraphs();
 PerfComponent.getMetricObject('Render');

return (
console.log('hello',active)
console.log('sdfdf', renderSummary)
)

// getActiveMetrics(component, metric) => {
//   if(component.)
// }


}


export default GraphsDisplayedData;


// componentsActiveOnGraphs

  //array of PerfComponents that are currently being displayed on the graph. You have to figure out what is being displayed



// let activeGraphDisplay = [];



//iterate thru componentsActiveOnGraphs
//for each component, figure out what metrics are active
//for each active metric, create an activeGraphDisplay react component and add it to the render array
//render your array

//build your onClick method
//fire disableMetricOnGraph for that component -- that component will then fire a method that will update state which causes a global render


// disableMetricOnGraph(metric,graph) {
//   this.RENDER[metric].activeGraphs[graph] = false;
// }

// getActiveMetrics()
//gives you an array of metric strings

// getMetricObject(category, metric)
//gives you an object with the following stuff:
      // data: [],
      // median: 0,
      // min: 0,
      // max: 0,
      // **graphDisplay: 'Line',
      // **colorTheme: 'blue',
      // strokeWidth: 2,
      // dotColor: 'blue',
      // **activeGraphs: {
      //   '0': false,
      //   '1': false
      // },
      // isRenderedOnGraph: {
      //   '0': false,
      //   '1': false
      // },
      // cache: [],
      // cacheIsCurrent: false,
      // animationIsActive: true
