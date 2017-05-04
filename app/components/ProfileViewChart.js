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
      <BarChart width={600} height={450} data={data} syncId='anyId'>
        <XAxis dataKey={xDataKey} />
        <YAxis />
        <CartesianGrid stroke={'#D1C4E9'} strokeDasharray="1 1" />
        <Tooltip />
        <Legend />
        <Bar dataKey={yDataKey} fill='#673ab7' />
        <Brush />
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
    <div className='buttonContainer'>
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
