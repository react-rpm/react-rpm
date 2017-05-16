import React, { PropTypes } from 'react';
import DataItem from './DataItem';

const DataItemList = ({ dataItems, onDataItemClick }) => (
  <div>
    {dataItems.map(dataItem =>
      <DataItem
        key={dataItem.id}
        {...dataItem}
        onClick={() => onDataItemClick(dataItem)}
      />
    )}
  </div>
);

DataItem.propTypes = {
  dataItems: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    selected: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  onDataItemClick: PropTypes.func.isRequired,
};

export default DataItemList;
