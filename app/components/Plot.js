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

          case 'bar':
            graphRenders[graph_code][metricName].push(
              <Bar
                key={i}
                dataKey={componentName}
                fill={metric.colorTheme}
                isAnimationActive={metricShouldAnimate}
              />)
            break;
          case 'line':
            graphRenders[graph_code][metricName].push(
              <Line
                key={i}
                type='linear'
                dataKey={componentName}
                stroke={metric.colorTheme}
                fill={metric.colorTheme}
                strokeWidth={1}
                activeDot={{ r: 4 }}
                dot={{ r: 1 }}
                isAnimationActive={metricShouldAnimate}
              />)
            break;

          case 'area':
            graphRenders[graph_code][metricName].push(
              <Area
                key={i}
                type="linear"
                dataKey={componentName}
                stroke={"'"+metric.colorTheme+"'"}
                fill={metric.colorTheme}
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
        ? (<Brush height={13} fill='#333940' />)
        : [],
      graphHeight: checkIfTwoGraphsActive()
        ? 170
        : 335
    }
  }

  let mainGraphParams, comparisonGraphParams;
  let graphOutput = [];
  let graphPlaceholder = [];

  if (compiledGraphData.length) {

    let iterator = [];
    let graphHeight = 335;

    iterator = [getGraphParams(0)];


    if (checkIfTwoGraphsActive()) {
      iterator.push(getGraphParams(1));
      graphHeight=170;
    }else{
    }

    iterator.forEach(graph => {
      graphOutput.push((
        <ComposedChart
          margin={{right:60, bottom:10, top: 30}}
          key={graph.code}
          width={500}
          height={graphHeight}
          data={data[graph.code]}
          fill={'transparent'}
          syncId="anyId"
        >
          <XAxis dataKey={"name"} label={'Renders'}/>
          <YAxis label={"ms"}/>
          <Tooltip 
            cursor={{fill: 'rgba(255,255,255,.05)'}}
            backgroundColor={'rgba(255,255,255.5)'}
          />
          {graph.graphRenders}
          {graph.brushComponent}
        </ComposedChart>
      ),
      )
    });
  }else{
    graphPlaceholder=(
      <div id={styles.graphPlaceholder}>
        <p id={styles.rpm_instructionsTitle}>react-rpm | component view</p>
        <p id={styles.rpm_instructions}>1. Select Metric</p>
        <p id={styles.rpm_instructions}>2. Select Component</p>
        <p id={styles.rpm_instructions}>3. Select Graph Style</p>
        <p id={styles.rpm_instructions}>4. Select Color</p>
        <p id={styles.rpm_instructions}>5. Press 'Graph I' to Render To Graph</p>
      </div>
    )
  }
  return (
    <div>
      <ReactTransition
        transitionName={viewEnterTransitions}
        transitionAppear={true}
        transitionAppearTimeout={2000} transitionEnterTimeout={800} transitionLeaveTimeout={500}>
        <div id={styles.graphContainer}>
          {graphOutput}
          {graphPlaceholder}
        </div>
        <div id={styles.graph_reflection}></div>
      </ReactTransition>
    </div>
  )
}

export default Plot;
