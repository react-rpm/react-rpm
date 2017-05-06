import React, { PropTypes } from 'react';
import PerfItemList from './PerfItemList';

const ProfileBar = ({ perfItems, onPerfItemClick, showDataKeys }) => (
  <div className='perfItemBar'
    style={{
      borderBottom: '1px solid #EEEEEE',
      borderTop: '1px solid #EEEEEE',
      margin: '8px auto 16px auto',
      paddingBottom: '8px',
      paddingTop: '8px',
      textAlign: 'center',
      width: '100%',
    }}
  >
    <PerfItemList
      perfItems={perfItems}
      onPerfItemClick={onPerfItemClick}
      showDataKeys={showDataKeys}
    />
  </div>
);

ProfileBar.propTypes = {
  perfItems: PropTypes.array.isRequired,
  onPerfItemClick: PropTypes.func.isRequired,
  showDataKeys: PropTypes.func.isRequired,
};

export default ProfileBar;
