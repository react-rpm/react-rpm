import React, { PropTypes } from 'react';

const ProfileDataKey = ({ onClick, selected, label }) => (
  <button
    onClick={onClick}
    style={{
      display: 'block',
      backgroundColor: selected ? '#DCEDC8' : 'white',
      color: selected ? 'black' : '#757575',
    }}
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
