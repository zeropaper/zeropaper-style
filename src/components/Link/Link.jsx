import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// import GatsbyLink from 'gatsby-link';
import TransitionLink from 'gatsby-plugin-transition-link';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({}, { name: 'Link' });

const Link = ({
  children,
  className,
  activeClassName,
  ...props
}) => {
  const classes = useStyles(props);
  const { to } = props;

  return (
    <TransitionLink
      to={to}
      // exit={{
      //   length: 0,
      //   trigger: ({ exit, node }) => console.info({ exit, node, direction: 'out' }),
      // }}
      // entry={{
      //   length: 0,
      //   trigger: ({ exit, node }) => console.info({ exit, node, direction: 'in' }),
      // }}
      className={classNames(className, classes.root)}
      activeClassName={activeClassName || classes.active}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {children}
    </TransitionLink>
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
