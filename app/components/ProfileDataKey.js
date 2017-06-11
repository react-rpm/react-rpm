import React from 'react';
import PropTypes from 'prop-types';
import styles from './../assets/profiledatakey.css';

const propTypes = {
  onClick: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
};

const ProfileDataKey = ({ onClick, selected, label }) => (
  <button
    onClick={onClick}
    className={
      selected ? styles.selected : styles.unselected
    }
  >
    {label}
  </button>
);

ProfileDataKey.propTypes = propTypes;

export default ProfileDataKey;

