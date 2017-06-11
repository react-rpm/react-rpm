import React from 'react';
import PropTypes from 'prop-types';
import ProfileDataKeyList from './ProfileDataKeyList';
import styles from './../assets/profiledatakey.css'

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
    id={styles.container}
  >
    <ProfileDataKeyList
      dataKeys={dataKeys}
      onDataKeyClick={onDataKeyClick}
    />
  </div>
);

ProfileContent.propTypes = propTypes;

export default ProfileContent;
