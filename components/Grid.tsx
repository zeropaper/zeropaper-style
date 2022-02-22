import styles from '../styles/Home.module.css'
import React from 'react'

import { Blocks } from './Blocks'

const Grid = (props: any) => {
  return (
    <div className={styles.grid}>
      <Blocks blocks={props.blocks || []} tinafield={props.tinafield} />
    </div>
  )
}

export default Grid
