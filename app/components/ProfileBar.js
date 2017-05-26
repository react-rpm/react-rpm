import React from 'react';
import PropTypes from 'prop-types';
import PerfItemList from './PerfItemList';

const propTypes = {
  perfItems: PropTypes.array.isRequired,
  onPerfItemClick: PropTypes.func.isRequired,
  showDataKeys: PropTypes.func.isRequired,
};

const ProfileBar = ({ perfItems, onPerfItemClick, showDataKeys }) => (
  <div
    className='perfItemBar'
    style={{
      borderBottom: '1px solid #EEEEEE',
      borderTop: '1px solid #EEEEEE',
      margin: '8px auto 16px auto',
      paddingBottom: '8px',
      paddingTop: '8px',
      textAlign: 'center',
      width: '100%',
      boxShadow: '0 2px 5px 0 rgba(145, 145, 145, 0.46)'
    }}
  >
    <PerfItemList
      perfItems={perfItems}
      onPerfItemClick={onPerfItemClick}
      showDataKeys={showDataKeys}
    />
  </div>
);

ProfileBar.propTypes = propTypes;

export default ProfileBar;
