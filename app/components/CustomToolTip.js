import React, { PropTypes } from 'react';

// componentsActiveOnGraphs
// tooltipValues

const CustomToolTip = props => {
  const {} = props;
  if (active) {
    const { payload, label } = this.props;
    return (
      <div className="custom-tooltip">
        <p className="label">{`${label} : ${payload[0].value}`}</p>
        <p className="intro">{this.getIntroOfPage(label)}</p>
        <p className="desc">Anything you want can be displayed here.</p>
      </div>
    );
  }
};
