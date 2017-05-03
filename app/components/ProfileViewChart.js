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
    onPerfItemClick,
    checkIfTwoGraphsActive,
  } = props;

  console.log('********** hello **********');
  console.log(perfData);
  const data = perfData[0];

  const graphOne = (
    <div>
      <BarChart width={600} height={450} data={data} syncId='anyId'>
        <XAxis dataKey={'Owner > Component'} />
        <YAxis />
        <CartesianGrid stroke={'#F8BBD0'} strokeDasharray="1 1" />
        <Tooltip />
        <Legend />
        <Bar dataKey='Inclusive wasted time (ms)' fill='#673ab7' />
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
          <Bar dataKey='Inclusive wasted time (ms)' fill='#673ab7' />
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
      <PerfItemList perfItems={perfItems} onPerfItemClick={onPerfItemClick} />
    </div>
  </div>
  );
};

ProfileViewChart.propTypes = {
  perfData: PropTypes.object.isRequired,
  perfItems: PropTypes.object.isRequired,
  onPerfItemClick: PropTypes.func.isRequired,
  checkIfTwoGraphsActive: PropTypes.func.isRequired,
};

export default ProfileViewChart;
