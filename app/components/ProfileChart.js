import React from 'react';
import PropTypes from 'prop-types';
import styles from './../assets/profilechart.css';
import viewEnterTransitions from './../assets/viewEnterTransitions.css';
import ReactTransition from 'react-transition-group/CSSTransitionGroup';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Brush,
} from 'Recharts';
import {graphColors} from './../assets/colors.js'

const propTypes = {
  chartData: PropTypes.array,
  perfItems: PropTypes.array.isRequired,
  dataKeys: PropTypes.array.isRequired,
  shouldAnimate: PropTypes.bool.isRequired,
};

const ProfileChart = (props) => {
  const { chartData, perfItems, dataKeys, shouldAnimate } = props;

  let data;

  console.log('perfItems:\n',perfItems);

  perfItems.forEach((perfItem) => {
    if (perfItem.selected) {
      console.log(perfItem.label,'is selected! Transfering to data variable...');
      console.log('chartData:\n',chartData);
      if (!chartData[perfItem.id].length)
        data = [
          'Inclusive wasted time (ms)': 0,
          'Instance count': 0,
          'Owner > Component': 'No Wasted Time',
          'Render count': 0,
        ]
        else
          data = chartData[perfItem.id];
      }
  });

  console.log('data:\n',data);
  let xDataKey;
  const keys = Object.keys(data[0]);
  keys.forEach((key) => {
    switch (key) {
      case 'Owner > Component':
        xDataKey = key;
        break;
      case 'Component':
        xDataKey = key;
        break;
      case 'Owner > Node':
        xDataKey = key;
        break;
    }
  });

  let yDataKey;
  dataKeys.forEach((key) => {
    if (key.selected) {
      yDataKey = key.label;
    }
  });

  const cellBgColor = i => i % 2 ? '#2f373e' : '#293036';

  let chart;
  if (perfItems[3].selected) {
    chart = (
      <div className={styles.opsTableContainer}>
        <table>
          <thead>
            <tr>
              <th>Index</th>
              {keys.map(k => <th
                key={k}
                className={k === yDataKey ? styles.indexSelected : styles.indexUnselected}
              >{k}</th>)}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) =>
              <tr key={i}>
                <td style={{ backgroundColor: cellBgColor(i) }}>{i}</td>
                {keys.map(k => <td
                  key={k}
                  className={
                    k === yDataKey ? styles.dataSelected : styles.dataUnselected
                  }
                >{row[k]}</td>)}
              </tr>,
            )}
          </tbody>
        </table>
      </div>
    );
  } else {
    chart = (
      <div className={styles.barChartContainer}>
        <BarChart
          width={500} height={335} data={data}
          margin={{ left: 0, right: 50, top: 20, bottom: 10}} syncId='anyId'
        >
          <XAxis dataKey={xDataKey}/>
          <YAxis />
          {/*<CartesianGrid stroke={'#757575'} strokeDasharray="1 1" />*/}
          <Tooltip 
            cursor={{fill: 'rgba(255,255,255,.05)'}}
          />
          {/*<Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} />*/}
          <Bar
            dataKey={yDataKey}
            fill='#7C4DFF'
            barSize={32}
            isAnimationActive={shouldAnimate}
          />
          <Brush height={16} fill='#333940' stroke='#24282d' />
        </BarChart>
      </div>
    );
  }

  return (
    <div>
      {/*<ReactTransition
        transitionName={viewEnterTransitions}
        transitionAppear={true}
        transitionAppearTimeout={1000} transitionEnterTimeout={800} transitionLeaveTimeout={800}>*/}
        <div className={styles.chartContainer}>
          {chart}
        </div>
      {/*</ReactTransition>*/}
    </div>
  );
};

ProfileChart.propTypes = propTypes;

export default ProfileChart;
