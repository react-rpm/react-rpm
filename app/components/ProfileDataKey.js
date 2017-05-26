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
      backgroundColor: selected ? 'rgba(242,116,116,.7)' : 'rgba(250,250,250,.6)',
      color: selected ? 'black' : '#757575',
      borderRadius:'2px'
    }}
  >
    {label}
  </button>
);

ProfileDataKey.propTypes = propTypes;

export default ProfileDataKey;

