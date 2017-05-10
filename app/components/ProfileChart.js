import React from 'react';
import PropTypes from 'prop-types';
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
  perfData: PropTypes.array.isRequired,
  perfItems: PropTypes.array.isRequired,
  dataKeys: PropTypes.array.isRequired,
};

const ProfileChart = (props) => {
  const {
    perfData,
    perfItems,
    dataKeys,
  } = props;

  let data;
  perfItems.forEach((perfItem) => {
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

  let chart;
  if (perfItems[3].selected) {
    chart = (
      <div
        className='opsTableContainer'
        style={{
          height: '400px',
          margin: '0 auto',
          overflowX: 'auto',
          overflowY: 'auto',
          width: '640px',
        }}
      >
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
                <td style={{ backgroundColor: i % 2 ? '#E1F5FE' : 'white' }}>{i}</td>
                {keys.map(k => <td
                  key={k}
                  style={{
                    backgroundColor: k === yDataKey ? '#FFCCBC' :
                      i % 2 ? '#E1F5FE' : 'white',
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
      <div
        className='barChartContainer'
        style={{
          margin: '0 auto',
          width: '560px',
        }}
      >
        <BarChart
          width={560} height={400} data={data}
          margin={{ top: 8, right: 56, left: 0, bottom: 16 }} syncId='anyId'
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
      {chart}
    </div>
  );
};

ProfileChart.propTypes = propTypes;

export default ProfileChart;
