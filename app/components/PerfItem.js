import React from 'react';
import PropTypes from 'prop-types';
import styles from './../assets/perfitem.css';

const propTypes = {
  onClick: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
};

const PerfItem = ({ onClick, selected, label }) => (
  <button
    onClick={onClick}
    className={
      selected ? styles.selected : styles.unselected
    }
  >
    {label}
  </button>
);

PerfItem.propTypes = propTypes;

export default PerfItem;
