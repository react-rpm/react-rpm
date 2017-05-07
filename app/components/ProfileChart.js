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

  const chart = (
    <div>
      <BarChart width={560} height={400} data={data}
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

  return (
    <div className='chartContainer'
      style={{
        margin: '0 auto',
        width: '560px',
      }}
    >
      {chart}
    </div>
  );
};

ProfileChart.propTypes = {
  perfData: PropTypes.array.isRequired,
  perfItems: PropTypes.array.isRequired,
  dataKeys: PropTypes.array.isRequired,
};

export default ProfileChart;
