import React from 'react';
import PropTypes from 'prop-types';
import ProfileDataKeyList from './ProfileDataKeyList';

const propTypes = {
  dataKeys: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      selected: PropTypes.bool.isRequired,
      label: PropTypes.string.isRequired,
    }).isRequired).isRequired,
  onDataKeyClick: PropTypes.func.isRequired,
};

const ProfileContent = ({ dataKeys, onDataKeyClick }) => (
  <div
    className='dataKeyListContainer'
    style={{
      margin: '0 auto',
      width: '420px',
      boxShadow: '0 2px 5px 0 rgba(145, 145, 145, 0.26)',
      paddingRight:'60px',
      paddingLeft:'60px',
    }}
  >
    <ProfileDataKeyList
      dataKeys={dataKeys}
      onDataKeyClick={onDataKeyClick}
    />
  </div>
);

ProfileContent.propTypes = propTypes;

export default ProfileContent;
