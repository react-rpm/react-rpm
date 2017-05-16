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
import DataItemList from './DataItemList';
import CustomToolTip from './CustomToolTip';
import styles from './../assets/plot.css';
import { colors } from './../assets/colors.js';
import viewEnterTransitions from './../assets/viewEnterTransitions.css';
import ReactTransition from 'react-transition-group/CSSTransitionGroup';

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

  const data = [[], []];
  const graphRenders = { '0': {}, '1': {} };
  let activeGraphs = [];

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

  const getGraphComponentForRender = (num) => {
    let arr = [];
    Object.keys(graphRenders[num]).forEach(el => {
      arr.push(graphRenders[num][el]);
    })
    return arr;
  }

  const getGraphParams = (num) => {
    return {
      code: num,
      id: num
        ? 'comparisonGraphContainer'
        : 'graphContainer',
      data: data[num],
      graphRenders: getGraphComponentForRender(num),
      brushComponent: num ? [] : (<Brush height={13} stroke='#413b4d' />),
      graphHeight: num
        ? 225
        : 420
      }
  }

  let mainGraphParams;
  let graphOutput = (<div id={styles.graphPlaceholder}></div>)

  if (compiledGraphData.length) {
    mainGraphParams = getGraphParams(0);
    graphOutput = (
        <ComposedChart
            width={600}
            height={mainGraphParams.graphHeight}
            data={data[mainGraphParams.code]}
            fill={'transparent'}
            syncId="anyId"
          >
            <XAxis dataKey={"name"} label={"Render"} />
            <YAxis />
            <CartesianGrid stroke={"transparent"} strokeDasharray="1 1" />
            <Tooltip />
            <Legend />)
            {mainGraphParams.graphRenders}
            {mainGraphParams.brushComponent_main}
          </ComposedChart>
      );
  }

  return (
    <div>
      <ReactTransition
        transitionName={viewEnterTransitions}
        transitionAppear={true}
        transitionAppearTimeout={1000} transitionEnterTimeout={0} transitionLeaveTimeout={0}>
        <div id={styles.graphContainer}>
        {graphOutput}
        </div>
      </ReactTransition>
    </div>
  )
}

/*if (checkIfTwoGraphsActive()) {
    comparisonGraph = (
      <div id={styles.comparisonGraphContainer}>
        <ComposedChart
          width={600}
          height={225}
          data={data[1]}
          fill={'transparent'}
          syncId="anyId"
        >
          <XAxis dataKey={"name"} label={"Render"} />
          <YAxis />
          <CartesianGrid stroke={"transparent"} strokeDasharray="1 1" />
          <Tooltip />
          <Legend />
          {graphRenders[1]['timeWasted']}
          {graphRenders[1]['renderCount']}
          {graphRenders[1]['instanceCount']}
          {graphRenders[1]['totalRenderTime']}
          {graphRenders[1]['averageRenderTime']}
          {graphRenders[1]['totalTime']}
          {graphRenders[1]['totalLifeCycleTime']}
          {brushComponent}
        </ComposedChart>
      </div>
    )
    brushComponent = [];
  }
  else comparisonGraph = [];*/

/*  

  return (
    <div className={styles.graphContainer}>
      {renderIfEmptyGraphs}
      <div>
        <ComposedChart
          width={600}
          height={graphHeight}
          data={data[0]}
          syncId="anyId"
          fill={'transparent'}
        >
          <XAxis dataKey={"name"} />
          <YAxis />
          <CartesianGrid stroke={"transparent"} strokeDasharray="1 1" />
          <Tooltip />
          <Legend />
          {graphRenders[0]['timeWasted']}
          {graphRenders[0]['renderCount']}
          {graphRenders[0]['instanceCount']}
          {graphRenders[0]['totalRenderTime']}
          {graphRenders[0]['averageRenderTime']}
          {graphRenders[0]['totalTime']}
          {graphRenders[0]['totalLifeCycleTime']}
          {brushComponent}
        </ComposedChart>
      </div>
      <br />
      {comparisonGraph}
      {/*<div className={styles.toolbarToggleTooltips}>
        <DataItemList dataItems={dataItems} onDataItemClick={onDataItemClick} />
      </div>*/
  //   </div>
  // );*/

export default Plot;
