import React, { PropTypes } from 'react';
import { ComposedChart, Bar, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Brush} from 'Recharts';
import TwoPaneToggle from './TwoPaneToggle';
import styles from './styles/plot.css'

const Plot = (props) => {

  const {
    compiledGraphData, //holds all graph data exported from each PerfComponent
    twoGraphsAreActive,
    twoGraphToggler,
    tooltipValues,
    tooltipToggleValues
  } = props;

  //this holds all the data in an arrays for the six graphs that are available. Only two are active in the current build
  //for more info on how this works check out http://recharts.org/#/en-US/examples
  const data = [
    [], //graph 0 (the main graph, and the top graph in the two pane display) -- this plots change in data over time (array)
    [], //graph 1 (the bottom graph in the two pane display) -- this plots change in data over time (array)
    [], //graph 2 (the main graph in summary view (not yet built). Summary view will mainly be pie charts and other single number graphs.
    [], //graph 3 //additional graph for summary view
    [], //graph 4 //additional graph for summary view
    [], //graph 5 //additional graph for summary view
  ]

  //these hold the individual JSX line/bar/pie chart components that are constructed. Numbers follow the same format as above.
  //for more info on how this works check out http://recharts.org/#/en-US/examples
  const graphRenders = {
    '0': {}, 
    '1': {},
    '2': {},
    '3': {},
    '4': {},
    '5': {}
  };

  //list of active graphs. we only want to iterate through the ones that are displayed, or the ones that have something to be displayed
  let activeGraphs = [];

  //used in loops to track which metric we're looking at. It's an object with the following format:
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
  let metric;
  let metricName;
  let metricShouldAnimate;

  //used for display in graph key
  let componentName;

  //used in loops to assemble metric data, which then gets passed to the data const defined above.
  let currData;

  //loop through each element passed in compiledGraphData (sent as prop from App)
  compiledGraphData.forEach( (item, i) => {


    metric = item[0];
    metricName = item[2];
    componentName = item[1]+': '+metricName;


    Object.keys(metric.activeGraphs).forEach(graph_code => {
      if(metric.activeGraphs[graph_code]) {

        currData = data[graph_code];

        metric.data.forEach( (value, j) => {

          if(currData.length - 1 < j || !currData.length) {
            currData.push({})
            currData[currData.length - 1].name = j;
          }
          currData[j][componentName] = value;
          data[graph_code] = currData;
        });

        if(!graphRenders[graph_code][metricName]) graphRenders[graph_code][metricName] = [];

        metricShouldAnimate = metric.animationIsActive;

        switch (metric.graphDisplay) {

          case 'Bar': 
            graphRenders[graph_code][metricName].push(
              <Bar 
                key={i} 
                dataKey={componentName} 
                fill={'blue'}
                isAnimationActive={metricShouldAnimate}
                />)

          case 'Line':
            graphRenders[graph_code][metricName].push(
              <Area
                key={i} 
                type='monotone' 
                dataKey={componentName} 
                stroke={metric.colorTheme} 
                fill={metric.colorTheme}
                strokeWidth={3} 
                activeDot={{r: 8}} 
                isAnimationActive={metricShouldAnimate}
                />)
        }
      }
    });
  });

  if (twoGraphsAreActive) {

    return (
      <div className='plotContainer'>
        <div>
            <TwoPaneToggle twoGraphsAreActive={twoGraphsAreActive} handleChange={twoGraphToggler}/>
            <ComposedChart width={600} height={225} data={data[0]} fill={'#C3C8CC'} syncId='anyId'>
              <XAxis dataKey={'name'}/>
              <YAxis/>
              <CartesianGrid stroke={'#DCFFFD'} strokeDasharray="1 1"/>
              <Tooltip/>
              <Legend/>
              {graphRenders[0]['timeWasted']},
              {graphRenders[0]['renderCount']}
              {graphRenders[0]['renderTime']}
              {graphRenders[0]['totalRenderTime']}
              {graphRenders[0]['averageRenderTime']}
              {graphRenders[0]['totalTime']}
              <Brush/>
            </ComposedChart>
          </div>
          <br/>
          <div>
            <ComposedChart width={600} height={225} data={data[1]} fill={'#C3C8CC'} syncId='anyId'>
              <XAxis dataKey={'name'} label={'Render'}/>
              <YAxis/>
              <CartesianGrid stroke={'#DCFFFD'} strokeDasharray="1 1"/>
              <Tooltip/>
              <Legend/>
              {graphRenders[1]['timeWasted']},
              {graphRenders[1]['renderCount']}
              {graphRenders[1]['renderTime']}
              {graphRenders[1]['totalRenderTime']}
              {graphRenders[1]['averageRenderTime']}
              {graphRenders[1]['totalTime']}
            </ComposedChart>
            <div className={styles.toolbarToggleTooltips}></div>
          </div>
        </div>

      );
  } else {
    return (

        <div className='plotContainer'>
            <TwoPaneToggle twoGraphsAreActive={twoGraphsAreActive} handleChange={twoGraphToggler}/>
            <ComposedChart width={600} height={450} data={data[0]} fill={'#C3C8CC'} syncId='anyId'
            >
              <XAxis dataKey={'name'}/>
              <YAxis/>
              <CartesianGrid stroke={'#DCFFFD'} strokeDasharray="1 1"/>
              <Tooltip/>
              <Legend/>
              {graphRenders[0]['timeWasted']},
              {graphRenders[0]['renderCount']}
              {graphRenders[0]['renderTime']}
              {graphRenders[0]['totalRenderTime']}
              {graphRenders[0]['averageRenderTime']}
              {graphRenders[0]['totalTime']}
              <Brush/>
            </ComposedChart>
            <div className={styles.toolbarToggleTooltips}></div>
        </div>

      );
  }
}
//margin={{top: 5, right: 30, left: 20, bottom: 5}}
export default Plot;