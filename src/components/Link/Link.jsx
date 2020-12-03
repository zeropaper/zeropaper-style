import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// import GatsbyLink from 'gatsby-link';
import TransitionLink from 'gatsby-plugin-transition-link';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({}, { name: 'Link' });

export const ExternalLink = ({
  href,
  children,
  ...rest
}) => (
  <a
    target="_blank"
    rel="noreferrer"
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...rest}
    href={href}
  >
    {children}
  </a>
);

ExternalLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

const Link = ({
  children,
  className,
  activeClassName,
  ...props
}) => {
  const classes = useStyles(props);
  const { to, href, ...rest } = props;

  if (href && !to) {
    return (
      <ExternalLink
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
        className={classNames(className, classes.root)}
        href={href}
      >
        {children}
      </ExternalLink>
    );
  }

  return (
    <TransitionLink
      exit={{
        length: 0.5,
      }}
      entry={{
        length: 0,
        delay: 0.5,
      }}
      className={classNames(className, classes.root)}
      activeClassName={activeClassName || classes.active}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      to={to}
    >
      {children}
    </TransitionLink>
  );
};

Link.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string,
  to: PropTypes.string,
  className: PropTypes.string,
  activeClassName: PropTypes.string,
};

Link.defaultProps = {
  className: null,
  href: null,
  to: null,
  activeClassName: null,
};

export default Link;
