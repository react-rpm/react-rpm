import React, { PropTypes } from 'react';
import {
  ComposedChart,
  Bar,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Brush
} from 'Recharts';
import TwoPaneToggle from './TwoPaneToggle';
import DataItemList from './DataItemList';
import CustomToolTip from './CustomToolTip';
import styles from './styles/plot.css';
import { colors } from './styles/colors.js';

require('./styles/tachometer.png');

const Plot = (props) => {

  const {
    compiledGraphData, // holds all graph data exported from each PerfComponent
    checkIfTwoGraphsActive,
    twoGraphToggler,
    dataItems,
    onDataItemClick,
    componentsActiveOnGraphs,
    getComponent,
    simData
  } = props;

  // console.log('dataItems in Plot.js is', dataItems);

  // console.log(
  //   'componentsActiveOnGraphs in Plot.js is',
  //   componentsActiveOnGraphs
  // );

  let graphHeight = 420;

  checkIfTwoGraphsActive() ? (graphHeight = 225) : (graphHeight = 420);

  const data = [[],[]];
  const graphRenders = { '0': {}, '1': {} };
  let activeGraphs = [];

  // used in loops to track which metric we're looking at. It's an object with the following format:
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

  // used for display in graph key
  let componentName;

  // used in loops to assemble metric data, which then gets passed to the data const defined above.
  let currData;

  // loop through each element passed in compiledGraphData (sent as prop from App)
  compiledGraphData.forEach((item, i) => {
    metric = item[0];
    metricName = item[2];

    componentName = item[1] + ': ' + metricName;

    Object.keys(metric.activeGraphs).forEach(graph_code => {
      if (metric.activeGraphs[graph_code]) {
        currData = data[graph_code];

        metric.data.forEach((value, j) => {
          if (currData.length - 1 < j || !currData.length) {
            currData.push({});
            currData[currData.length - 1].name = j;
          }
          currData[j][componentName] = value;
          data[graph_code] = currData;
        });

        if (!graphRenders[graph_code][metricName])
          graphRenders[graph_code][metricName] = [];

        metricShouldAnimate = metric.animationIsActive;

        switch (metric.graphDisplay) {

          case 'Bar':
            graphRenders[graph_code][metricName].push(
              <Bar
                key={i}
                dataKey={componentName}
                fill={colors[metric.colorTheme]}
                isAnimationActive={metricShouldAnimate}
              />)
            break;
          case 'Line':
            graphRenders[graph_code][metricName].push(
              <Line
                key={i}
                type='monotone'
                dataKey={componentName}
                stroke={colors[metric.colorTheme]}
                fill={colors[metric.colorTheme]}
                strokeWidth={3}
                activeDot={{ r: 8 }}
                dot={{ r: 2 }}
                isAnimationActive={metricShouldAnimate}
              />)
            break;

          case 'Area':
            graphRenders[graph_code][metricName].push(
              <Area
                key={i}
                type="monotone"
                dataKey={componentName}
                stroke={colors[metric.colorTheme]}
                fill={colors[metric.colorTheme]}
                strokeWidth={3}
                activeDot={{ r: 8 }}
                isAnimationActive={metricShouldAnimate}
              />)
            break;
        }
      }
    });
  });

  let graphTwo;
  let placeholder;

  if (checkIfTwoGraphsActive()) {
    graphTwo = (
      <div className={styles.graphContainer}>
        <ComposedChart
          width={600}
          height={225}
          data={data[1]}
          fill={'transparent'}
          syncId="anyId"
        >
          <XAxis dataKey={"name"} label={"Render"} />
          <YAxis />
          <CartesianGrid stroke={"#606060"} strokeDasharray="1 1" />
          <Tooltip
          />
          <Legend />
          {graphRenders[1]['timeWasted']}
          {graphRenders[1]['renderCount']}
          {graphRenders[1]['instanceCount']}
          {graphRenders[1]['totalRenderTime']}
          {graphRenders[1]['averageRenderTime']}
          {graphRenders[1]['totalTime']}
          {graphRenders[1]['totalLifeCycleTime']}
        </ComposedChart>
      </div>
    );
  } else {
    graphTwo = (<div></div>);
    if(graphHeight === 225) {
      graphHeight = 420;
    }
  }
  if (!compiledGraphData.length) 
    placeholder = (
      <div id={styles.graphPlaceholder}></div>
    )
            //     content={
            //   <CustomToolTip
            //     componentsActiveOnGraphs={componentsActiveOnGraphs}
            //     dataItems={dataItems}
            //     getComponent={getComponent}
            //   />
            // }
  return (
    <div className={styles.graphContainer}>
      {placeholder}
      <div>
        <ComposedChart
          width={600}
          height={graphHeight}
          data={data[0]}
          syncId="anyId"
          fill={'#606060'}
          >
          <XAxis dataKey={"name"} />
          <YAxis />
          <CartesianGrid stroke={"#494d4e"} strokeDasharray="1 1" />
          <Tooltip
          />
          <Legend />
          {graphRenders[0]['timeWasted']}
          {graphRenders[0]['renderCount']}
          {graphRenders[0]['instanceCount']}
          {graphRenders[0]['totalRenderTime']}
          {graphRenders[0]['averageRenderTime']}
          {graphRenders[0]['totalTime']}
          {graphRenders[0]['totalLifeCycleTime']}
          <Brush />
        </ComposedChart>
      </div>
      <br />
      {graphTwo}
      {/*<div className={styles.toolbarToggleTooltips}>
        <DataItemList dataItems={dataItems} onDataItemClick={onDataItemClick} />
      </div>*/}
    </div>
  );
};
export default Plot;
