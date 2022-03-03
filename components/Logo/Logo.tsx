import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createStyles as createUseStyles } from '@mantine/core';

import Slim from './assets/zeropaper-slim.svg';
import Fat from './assets/zeropaper-fat.svg';

type LogoProps = {
  slim?: boolean,
  fill?: string
  stroke?: string
  strokeWidth?: number
  className?: string
}

const useStyles = createUseStyles({
  root: {},
});

const Logo = (props: LogoProps) => {
  const { slim, className } = props;
  const Comp = slim ? Slim : Fat;
  const styles = useStyles();
  const { classes } = styles;
  return <Comp className={classNames(classes.root, className)} />;
};

Logo.propTypes = {
  slim: PropTypes.bool,
  className: PropTypes.string,
};

Logo.defaultProps = {
  slim: false,
  className: null,
};

export default Logo;
