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
      marginTop: '40px',
      marginLeft: '-20px',
      paddingBottom: '8px',
      fontFamily:'Open Sans',
      fontSize:'12px',
      paddingTop: '8px',
      textAlign: 'center',
      width: '500px',
      zIndex:2
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

//background:'rgba(28,28,28,.9)',