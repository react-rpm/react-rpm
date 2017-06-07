import React from 'react';
import PropTypes from 'prop-types';
import ProfileDataKey from './ProfileDataKey';

const propTypes = {
  dataKeys: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      selected: PropTypes.bool.isRequired,
      label: PropTypes.string.isRequired,
    }).isRequired).isRequired,
  onDataKeyClick: PropTypes.func.isRequired,
};

const ProfileDataKeyList = ({ dataKeys, onDataKeyClick }) => (
  <div className='dataKeyContainer'
  >
    {dataKeys.map(dataKey =>
      <ProfileDataKey
        key={dataKey.id}
        {...dataKey}
        onClick={() => onDataKeyClick(dataKey)}
      />,
    )}
  </div>
);

ProfileDataKeyList.propTypes = propTypes;

export default ProfileDataKeyList;
