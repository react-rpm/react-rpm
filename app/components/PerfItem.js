import React, { PropTypes } from 'react';

const PerfItem = ({ onClick, selected, label }) => (
  <li
    onClick={onClick}
    style={{
      backgroundColor: selected ? '#03A9F4' : 'white',
    }}
  >
    {label}
  </li>
);

PerfItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
};

export default PerfItem;
