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
  console.log(compiledGraphData);
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
      brushComponent: num
        ? (<Brush height={13} stroke='#413b4d' />)
        : [],
      graphHeight: checkIfTwoGraphsActive()
        ? 225
        : 335
    }
  }

  let mainGraphParams, comparisonGraphParams;
  let graphOutput = [];

  if (compiledGraphData.length) {

    let iterator = [];

    iterator = [getGraphParams(0)];

    if (checkIfTwoGraphsActive())
      iterator.push(getGraphParams(1));

    iterator.forEach(graph => {
      graphOutput.push((
        <ComposedChart
          key={graph.code}
          width={500}
          height={graph.graphHeight}
          data={data[graph.code]}
          fill={'transparent'}
          syncId="anyId"
        >
          <XAxis dataKey={"name"} label={"Render"} />
          <YAxis label={"ms"}/>
          <CartesianGrid stroke={"transparent"} strokeDasharray="1 1" />
          <Tooltip />
          {graph.graphRenders}
          {graph.brushComponent}
        </ComposedChart>
      ),
      )
    });
  } else graphOutput.push(<div id={styles.graphPlaceholder}></div>);

  return (
    <div>
      <ReactTransition
        transitionName={viewEnterTransitions}
        transitionAppear={true}
        transitionAppearTimeout={2000} transitionEnterTimeout={800} transitionLeaveTimeout={500}>
        <div id={styles.graphContainer}>
          {graphOutput}
          
        </div>
        <div id={styles.graph_reflection}></div>
      </ReactTransition>
    </div>
  )
}

export default Plot;
