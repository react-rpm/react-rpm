import React, { PropTypes } from 'react';
import styles from './../assets/dataitem.css';

const DataItem = ({ onClick, selected, label }) => (
  <button
    onClick={onClick}
    style={{color:'red'}}
    className={
      selected ? styles.selected : styles.unselected
    }
  >
    {label}
  </button>
);

// DataItem.propTypes = {
//   onClick: PropTypes.func.isRequired,
//   selected: PropTypes.bool.isRequired,
//   label: PropTypes.string.isRequired,
// };

export default DataItem;
