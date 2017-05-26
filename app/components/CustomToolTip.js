import React, { PropTypes } from 'react';
import styles from './../assets/custom_tooltip.css'

// const splitDataKey = (dataKey) => {
//   return dataKey.split(': ');
// }

// const buildDisplay = (payload) => {

//   const components = {};

//   payload.forEach(load => {
//     let [component, metric] = splitDataKey(load.dataKey);
//     if (!components.hasOwnProperty(component))
//       components[component] = [metric, load.value]
//     else 
//       components[component].push([metric,value]);
    


//   })
//   const [component, metric] = splitDataKey(dataKeys);

// }

const CustomToolTip = props => {
  const {active} = props


  if (active) {
    const {label, payload, type} = props

    console.log('this:',props);
    return (
      <div className={styles.customTooltip}>
        <p>{`Render: ${label}`}</p>
        {payload.map(load => 
          <div>
            <p>{`${load.dataKey}`}</p>
            <p>{`${load.value}`}</p>
          </div>
        )}
      </div>
    );
  }
};

export default CustomToolTip;
