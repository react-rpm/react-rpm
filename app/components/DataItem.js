import React, { PropTypes } from 'react';

const DataItem = ({ onClick, selected, label }) => (
  <button
    onClick={onClick}
    style={{
      backgroundColor: selected ? 'gray' : 'white'
    }}
  >
    {label}
  </button>
);

DataItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
};

export default DataItem;
