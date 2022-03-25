import React from 'react'

import { ClassNames } from '../../typings';

export interface PropTypes {
  children: React.ReactNode
  background?: MantineColor
  className?: string
  outerComponent?: React.ElementType
  innerClassName?: string
  innerComponent?: React.ElementType
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
  outerComponent: OuterComponent = 'div',
  innerComponent: InnerComponent = 'div',
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
    <OuterComponent className={outerClasses} {...props}>
      <InnerComponent className={innerClasses}>{children}</InnerComponent>
    </OuterComponent>
  )
}

export default Wrapper
