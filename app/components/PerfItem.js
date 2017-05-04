import React, { PropTypes } from 'react';

const PerfItem = ({ onClick, selected, label }) => (
  <button
    onClick={onClick}
    style={{
      backgroundColor: selected ? '#B3E5FC' : 'white',
      color: selected ? 'black' : '#757575',
    }}
  >
    {label}
  </button>
);

PerfItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
};

export default PerfItem;
