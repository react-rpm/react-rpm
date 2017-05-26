import React, { PropTypes } from 'react';
import styles from './../assets/DataItemList.css';



const DataItem = ({ onClick, selected, label }) => (
  <button
    onClick={onClick}
    style={{
      backgroundColor: selected ? 'rgba(1,190,229, .9)' : 'transparent',
      color: selected ? 'black' : 'white'
    }}
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
