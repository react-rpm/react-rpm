import React, { PropTypes } from 'react';
import PerfItem from './PerfItem';
import styles from './DataItemList.css';

const PerfItemList = ({ perfItems, onPerfItemClick, showDataKeys }) => (
  <ul>
    {perfItems.map(perfItem =>
      <PerfItem
        key={perfItem.id}
        {...perfItem}
        onClick={() => {
          onPerfItemClick(perfItem);
          showDataKeys(perfItem);
        }}
      />
    )}
  </ul>
);

PerfItem.propTypes = {
  perfItems: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    selected: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  onPerfItemClick: PropTypes.func.isRequired,
  showDataKeys: PropTypes.func.isRequired,
};

export default PerfItemList;
