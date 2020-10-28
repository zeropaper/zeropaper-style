import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link as GatsbyLink } from 'gatsby';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({}, { name: 'Link' });

const Link = ({
  children,
  className,
  activeClassName,
  ...props
}) => {
  const classes = useStyles(props);

  return (
    <GatsbyLink
      className={classNames(className, classes.root)}
      activeClassName={activeClassName || classes.active}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {children}
    </GatsbyLink>
  );
};

Link.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
  className: PropTypes.string,
  activeClassName: PropTypes.string,
};

Link.defaultProps = {
  className: null,
  activeClassName: null,
};

export default Link;
