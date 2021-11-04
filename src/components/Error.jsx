import React from 'react'
import styles from '../styles/error.module.css'

const Error = ({ message }) => (
  <div className={styles.error__message}>{message}</div>
)

export default Error
