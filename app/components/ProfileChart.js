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

const propTypes = {
  perfData: PropTypes.array,
  perfItems: PropTypes.array.isRequired,
  dataKeys: PropTypes.array.isRequired,
};

const ProfileChart = (props) => {

  const { perfData, perfItems, dataKeys } = props;

  let data;

  perfItems.forEach((perfItem, i) => {
    if (perfItem.selected) {
      data = perfData[perfItem.id];
    }
  });
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

  const cellBgColor = i => i % 2 ? '#E1F5FE' : 'white';

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
                style={{ backgroundColor: k === yDataKey ? '#FFCCBC' : 'white' }}
              >{k}</th>)}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) =>
              <tr key={i}>
                <td style={{ backgroundColor: cellBgColor(i) }}>{i}</td>
                {keys.map(k => <td
                  key={k}
                  style={{
                    backgroundColor: k === yDataKey ? '#FFCCBC' : cellBgColor(i),
                    maxWidth: '300px',
                    overflowX: 'auto',
                  }}
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
          width={600} height={420} data={data}
          margin={{ right: 56, left: 0, bottom: 16 }} syncId='anyId'
        >
          <XAxis dataKey={xDataKey} />
          <YAxis />
          <CartesianGrid stroke={'#757575'} strokeDasharray="1 1" />
          <Tooltip />
          <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} />
          <Bar dataKey={yDataKey} fill='#7C4DFF' barSize={64} />
          <Brush height={16} stroke='#757575' />
        </BarChart>
      </div>
    );
  }

  return (
    <div>
      <ReactTransition
        transitionName={viewEnterTransitions}
        transitionAppear={true}
        transitionAppearTimeout={1000} transitionEnterTimeout={800} transitionLeaveTimeout={800}>
        <div className={styles.chartContainer}>
          {chart}
        </div>
      </ReactTransition>
    </div>
    
  );
};

ProfileChart.propTypes = propTypes;

export default ProfileChart;