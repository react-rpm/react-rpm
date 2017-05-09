import React from 'react';
import styles from './Button.css'
import { getButton } from './../containers/App' 

export default function Button({ children, ...rest }) {
  return (
    <button id={styles.start_button} {...rest}>{children}</button>
  );
}
