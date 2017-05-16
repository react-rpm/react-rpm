import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  onClick: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
};

const ProfileDataKey = ({ onClick, selected, label }) => (
  <button
    onClick={onClick}
    style={{
      display: 'block',
      backgroundColor: selected ? '#FFCCBC' : 'white',
      color: selected ? 'black' : '#757575',
    }}
  >
    {label}
  </button>
);

ProfileDataKey.propTypes = propTypes;

export default ProfileDataKey;

