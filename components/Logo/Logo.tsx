import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createUseStyles } from 'react-jss';

import { ReactComponent as Slim } from '../../assets/images/zeropaper-slim.svg';
import { ReactComponent as Fat } from '../../assets/images/zeropaper-fat.svg';

const useStyles = createUseStyles({
  root: ({
    slim,
    fill = 'none',
    stroke = 'currentColor',
    strokeWidth = 0,
  }) => ({
    '& path': !slim ? {
      fill,
      stroke,
      strokeWidth: strokeWidth || 25,
    } : {
      stroke: fill,
      fill: stroke,
      strokeWidth,
    },
  }),
}, {
  name: 'Logo',
});

const Logo = (props) => {
  const { slim, className } = props;
  const Comp = slim ? Slim : Fat;
  const classes = useStyles(props);
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
