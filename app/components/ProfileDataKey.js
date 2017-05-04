import React, { PropTypes } from 'react';

const ProfileDataKey = ({ onClick, selected, label }) => (
  <button
    onClick={onClick}
    style={{ backgroundColor: selected ? '#8BC34A' : 'white' }}
  >
    {label}
  </button>
);

ProfileDataKey.propTypes = {
  onClick: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
};

export default ProfileDataKey;
