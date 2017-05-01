import React, { PropTypes } from 'react';

// componentsActiveOnGraphs
// tooltipValues

const CustomToolTip = props => {
  const { componentsActiveOnGraphs, dataItems } = props;

  console.log('componentsActiveOnGraphs looks like',componentsActiveOnGraphs);
  console.log('dataItems looks like',dataItems);

  return (
    <div className="custom-tooltip">
      <p className="label">test1</p>
      <p className="intro">test2</p>
      <p className="desc">test3</p>
    </div>
  );
};

export default CustomToolTip;