import React, { PropTypes } from 'react';
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
import PerfItemList from './PerfItemList';

const ProfileViewChart = (props) => {
  const {
    perfData,
    perfItems,
    dataKeys,
    onPerfItemClick,
    showDataKeys,
    checkIfTwoGraphsActive,
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

  const graphOne = (
    <div>
      <BarChart width={560} height={400} data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }} syncId='anyId'
      >
        <XAxis dataKey={xDataKey} />
        <YAxis />
        <CartesianGrid stroke={'#D1C4E9'} strokeDasharray="1 1" />
        <Tooltip />
        <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} />
        <Bar dataKey={yDataKey} fill='#673ab7' barSize={64} />
        <Brush height={16} stroke='#7E57C2' />
      </BarChart>
    </div>
  );
  let graphTwo;
  if (checkIfTwoGraphsActive()) {
    graphTwo = (
      <div>
        <BarChart width={600} height={225} data={data} syncId='anyId'>
          <XAxis dataKey={xDataKey} />
          <YAxis />
          <CartesianGrid stroke={'#D1C4E9'} strokeDasharray="1 1" />
          <Tooltip />
          <Legend />
          <Bar dataKey={yDataKey} fill='#673ab7' />
        </BarChart>
      </div>
    );
  } else {
    graphTwo = (<div></div>);
  }

  return (
  <div className='chartContainer'>
    {graphOne}
    <br />
    {graphTwo}
    <div className='perfItemBar'
      style={{
        borderBottom: '1px solid #EEEEEE',
        borderTop: '1px solid #EEEEEE',
        margin: '0 auto',
        paddingBottom: '8px',
        paddingTop: '8px',
        textAlign: 'center',
        width: '100%',
      }}
    >
      <PerfItemList
        perfItems={perfItems}
        onPerfItemClick={onPerfItemClick}
        showDataKeys={showDataKeys}
      />
    </div>
  </div>
  );
};

ProfileViewChart.propTypes = {
  perfData: PropTypes.array.isRequired,
  perfItems: PropTypes.array.isRequired,
  dataKeys: PropTypes.array.isRequired,
  onPerfItemClick: PropTypes.func.isRequired,
  showDataKeys: PropTypes.func.isRequired,
  checkIfTwoGraphsActive: PropTypes.func.isRequired,
};

export default ProfileViewChart;
