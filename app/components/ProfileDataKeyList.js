import React, { PropTypes } from 'react';
import ProfileDataKey from './ProfileDataKey';

const ProfileDataKeyList = ({ dataKeys, onDataKeyClick }) => (
  <div>
    {dataKeys.map(dataKey =>
      <ProfileDataKey
        key={dataKey.id}
        {...dataKey}
        onClick={() => onDataKeyClick(dataKey)}
      />
    )}
  </div>
);

ProfileDataKeyList.propTypes = {
  dataKeys: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    selected: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  onDataKeyClick: PropTypes.func.isRequired,
};

export default ProfileDataKeyList;
