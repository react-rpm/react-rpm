import React from 'react';
import PropTypes from 'prop-types';
import PerfItem from './PerfItem';

const propTypes = {
  perfItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      selected: PropTypes.bool.isRequired,
      label: PropTypes.string.isRequired,
    }).isRequired).isRequired,
  onPerfItemClick: PropTypes.func.isRequired,
  showDataKeys: PropTypes.func.isRequired,
};

const PerfItemList = ({ perfItems, onPerfItemClick, showDataKeys }) => (
  <div className='PerfItemContainer'>
    {perfItems.map(perfItem =>
      <PerfItem
        key={perfItem.id}
        {...perfItem}
        onClick={() => {
          onPerfItemClick(perfItem);
          showDataKeys(perfItem);
        }}
      />,
    )}
  </div>
);

PerfItemList.propTypes = propTypes;

export default PerfItemList;
