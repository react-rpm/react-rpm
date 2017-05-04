import React, { PropTypes } from 'react';
import ProfileDataKeyList from './ProfileDataKeyList';

const ProfileContent = ({ dataKeys, onDataKeyClick }) => (
  <div className='dataKeyList'
    style={{
      margin: '16px 64px',
    }}
  >
    <ProfileDataKeyList
      dataKeys={dataKeys}
      onDataKeyClick={onDataKeyClick}
    />
  </div>
);

ProfileContent.propTypes = {
  perfItems: PropTypes.array.isRequired,
  dataKeys: PropTypes.array.isRequired,
  onDataKeyClick: PropTypes.func.isRequired,
};

export default ProfileContent;
