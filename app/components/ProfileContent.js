import React from 'react';
import PropTypes from 'prop-types';
import ProfileDataKeyList from './ProfileDataKeyList';

const ProfileContent = ({ dataKeys, onDataKeyClick }) => (
  <div>
    <div className='dataKeyListContainer'
      style={{
        margin: '0 auto',
        width: '420px',
      }}
    >
      <ProfileDataKeyList
        dataKeys={dataKeys}
        onDataKeyClick={onDataKeyClick}
      />
    </div>
  </div>
);

ProfileContent.propTypes = {
  dataKeys: PropTypes.array.isRequired,
  onDataKeyClick: PropTypes.func.isRequired,
};

export default ProfileContent;
