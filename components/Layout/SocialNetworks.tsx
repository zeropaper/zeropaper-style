import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createStyles as createUseStyles } from '@mantine/core';

import Twitter from './assets/twitter.svg';
import StackExchange from './assets/stackexchange.svg';
import LinkedIn from './assets/linkedin.svg';
import GitHub from './assets/github.svg';
import ExternalLink from '../Link/Link';

type SocialNetworksProps = {
  className?: string;
  classes?: { [k: string]: string };
}

const useStyles = createUseStyles(
  {
    root: {
      overflow: 'hidden',
    },
    list: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
      display: 'flex',
    },
    item: {
      padding: 0,
      margin: '0 0.5em',
      '&:first-of-type': {
        marginLeft: 0,
      },
      '&:last-child': {
        marginRight: 0,
      }
    },
    link: {
      display: 'flex',
    },
    icon: {
      width: '1.25em',
      height: '1.25em',
      '& path': {
        fill: 'currentColor',
      }
    },
  }
);

const SocialNetworks = ({ className, classes: passedClasses, ...props }: SocialNetworksProps) => {
  const { classes } = useStyles();

  return (
    <nav className={classNames(classes.root, passedClasses?.root, className)}>
      <ul className={classNames(classes.list, passedClasses?.list)}>
        <li className={classes.item}>
          <ExternalLink
            className={classes.link}
            rel="me"
            href="https://twitter.com/zeropaper"
          >
            <Twitter className={classes.icon} />
          </ExternalLink>
        </li>
        <li className={classes.item}>
          <ExternalLink
            className={classes.link}
            rel="me"
            href="https://github.com/zeropaper"
          >
            <GitHub className={classes.icon} />
          </ExternalLink>
        </li>
        <li className={classes.item}>
          <ExternalLink
            className={classes.link}
            href="https://stackoverflow.com/users/story/662964"
          >
            <StackExchange className={classes.icon} />
          </ExternalLink>
        </li>
        <li className={classes.item}>
          <ExternalLink
            className={classes.link}
            rel="me"
            href="https://www.linkedin.com/in/vvago"
          >
            <LinkedIn className={classes.icon} />
          </ExternalLink>
        </li>
      </ul>
    </nav>
  );
};

SocialNetworks.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.objectOf(PropTypes.string),
};

SocialNetworks.defaultProps = {
  className: null,
  classes: null,
};

export default SocialNetworks;
