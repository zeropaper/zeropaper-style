import React from 'react'

import styles from '../styles/Home.module.css'

const LinkCard = (props: any) => {
  const { href, title, description, tinafield } = props || {}
  return (
    <a href={href} className={styles.card}>
      <h2 data-tinafield={[tinafield, 'title'].filter(Boolean).join('.')}>
        {title} &rarr;
      </h2>
      <p data-tinafield={[tinafield, 'description'].filter(Boolean).join('.')}>
        {description}
      </p>
    </a>
  )
}

export default LinkCard
