import React from 'react'

import useStyles from './PageBlockWrapper.styles'
import useLayoutStyles from '../Layout/Layout.styles'
import { MantineColor } from '@mantine/core'

export interface PropTypes {
  children: React.ReactNode
  background?: MantineColor
  className?: string
  innerClassName?: string
  classes?: ClassNames<typeof useStyles>
  slant?: boolean
}

export const Wrapper = ({
  background,
  className,
  innerClassName,
  children,
  classes: passedClasses = {},
  slant,
  ...props
}: PropTypes) => {
  const { classes, cx } = useStyles()
  const { classes: layoutClasses } = useLayoutStyles()
  const outerClasses = cx(
    layoutClasses.root,
    classes.root,
    {
      [classes.decoSlant]: slant,
      [`${background}`]: !!background,
    },
    passedClasses.root,
    className
  )
  const innerClasses = cx(
    layoutClasses.inner,
    classes.inner,
    passedClasses.inner,
    innerClassName
  )
  return (
    <section className={outerClasses} {...props}>
      <div className={innerClasses}>{children}</div>
    </section>
  )
}

export default Wrapper
