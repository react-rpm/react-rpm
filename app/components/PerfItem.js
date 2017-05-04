import React, { PropTypes } from 'react';

const PerfItem = ({ onClick, selected, label }) => (
  <button
    onClick={onClick}
    style={{ backgroundColor: selected ? '#03A9F4' : 'white' }}
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
