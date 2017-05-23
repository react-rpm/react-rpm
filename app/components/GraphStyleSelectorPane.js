import React from 'react';
import PropTypes from 'prop-types';
import styles from './../assets/graphStyleSelectorPane.css';
import { colors } from './../assets/colors.js';


const GraphStyleSelectorPane = (props) => {

  return (

    <div id={styles.graphOptions}>
      <button>hello</button>
      {/*<span className={styles.selectorSpan}>Graphs</span>*/}
      <img className={styles.graphButton} src={require('./../assets/images/graph_button.png')}/>
      <img className={styles.graphButton} src={require('./../assets/images/graph_button_line.png')}/>
      <img className={styles.graphButton} src={require('./../assets/images/graph_button_area.png')}/>
    </div>
  )
}

export default GraphStyleSelectorPane;