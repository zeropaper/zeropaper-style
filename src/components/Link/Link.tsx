import * as React from 'react';
import classNames from 'classnames';
// import GatsbyLink from 'gatsby-link';
import TransitionLink from 'gatsby-plugin-transition-link';
import { createUseStyles } from 'react-jss';

type LinkClasses = {
  root: string;
  active: string;
};

const useStyles = createUseStyles(
  {
    root: {},
    active: {},
  },
  { name: 'Link' },
);

interface ExternalLinkProps {
  children: React.ReactNode;
  href: string;
  title?: string;
  className?: string;
  activeClassName?: string;
}

export const ExternalLink = ({
  href,
  children,
  ...rest
}: ExternalLinkProps): React.ReactElement => (
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

ExternalLink.defaultProps = {
  className: null,
  activeClassName: null,
  title: null,
};

interface LinkProps {
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
  to?: string;
  href?: string;
  title?: string;
}

const Link = ({
  children,
  className,
  activeClassName,
  ...props
}: LinkProps): React.ReactElement => {
  const classes: LinkClasses = useStyles(props);
  const { to, href, ...rest } = props;

  if (href) {
    if (href.startsWith('http')) {
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
      <a
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
        className={classNames(className, classes.root)}
        href={href}
      >
        {children}
      </a>
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

Link.defaultProps = {
  className: null,
  activeClassName: null,
  href: null,
  to: null,
  title: null,
};

export default Link;
