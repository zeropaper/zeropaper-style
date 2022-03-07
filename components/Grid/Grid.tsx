import React, { ComponentProps } from 'react'

// import styles from '../../styles/Home.module.css'
const styles: any = {};

import { Blocks } from '../Blocks/Blocks'

const Grid = (props: ComponentProps<typeof Blocks>) => {
  return (
    <div className={styles.grid}>
      <Blocks blocks={props.blocks || []} tinaField={props.tinaField} />
    </div>
  )
}

export default Grid
