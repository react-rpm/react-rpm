import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  onClick: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
};

const PerfItem = ({ onClick, selected, label }) => (
  <button
    onClick={onClick}
    style={{
      backgroundColor: selected ? 'rgba(129,212,250, .7)' : 'rgba(250,250,250,.6)',
      color: selected ? 'black' : '#757575',
      boxShadow: '0 2px 5px 0 rgba(145, 145, 145, 0.26)',
      borderRadius:'2px'
    }}
  >
    {label}
  </button>
);

PerfItem.propTypes = propTypes;

export default PerfItem;
