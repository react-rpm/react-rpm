import React, { PropTypes } from 'react';
import styles from './DataItemList.css';



const DataItem = ({ onClick, selected, label }) => (
  <div
    className={styles.data_item}
    onClick={onClick}
    style={{
      backgroundColor: selected ? 'rgba(1,190,229, .9)' : 'transparent',
      color: selected ? 'black' : 'white'
    }}
  >
    {label}
  </div>
);

DataItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
};

export default DataItem;
