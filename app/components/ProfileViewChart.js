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
import styles from './styles/plot.css';

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

  let dataKey;
  dataKeys.forEach((key) => {
    if (key.selected) {
      dataKey = key.label;
    }
  });

  console.log('********** hello **********');
  console.log(perfData);

  const graphOne = (
    <div>
      <BarChart width={600} height={450} data={data} syncId='anyId'>
        <XAxis dataKey={'Owner > Component'} />
        <YAxis />
        <CartesianGrid stroke={'#F8BBD0'} strokeDasharray="1 1" />
        <Tooltip />
        <Legend />
        <Bar dataKey={dataKey} fill='#673ab7' />
        <Brush />
      </BarChart>
    </div>
  );
  let graphTwo;
  if (checkIfTwoGraphsActive()) {
    graphTwo = (
      <div>
        <BarChart width={600} height={225} data={data} syncId='anyId'>
          <XAxis dataKey={'name'} label={'Render'} />
          <YAxis />
          <CartesianGrid stroke={'#F8BBD0'} strokeDasharray="1 1" />
          <Tooltip />
          <Legend />
          <Bar dataKey={dataKey} fill='#673ab7' />
        </BarChart>
      </div>
    );
  } else {
    graphTwo = (<div></div>);
  }

  return (
  <div className='plotContainer'>
    {graphOne}
    <br />
    {graphTwo}
    <div className={styles.toolbarToggleTooltips}>
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
