import React from 'react';
import PropTypes from 'prop-types';
import styles from './../assets/componentSelectorPane.css';
import { colors } from './../assets/colors.js';


const ComponentSelectorPane = (props) => {

  const {componentOptions, handleComponentClick} = props;

  // const toggleSelectedClass = styles.unselected;

  const handleClick = (component) => {
    props.handleComponentClick(component)
  }

  return (
    <div id={styles.componentOptions}>
      <span className={styles.selectorSpan}>component</span>
        {
          props.componentOptions.length > 0 && 
          props.componentOptions.map( (component, i) => 
              <button 
                key={i}
                onClick={
                  ()=> handleClick(component)
                }
                className={styles.componentButton}
              >
            {component}
        </button>
        )}
        <div>
        {
          !props.componentOptions.length && 
          <span>No Components Logged</span>
        }
        </div>
    </div>
  )
}

export default ComponentSelectorPane;