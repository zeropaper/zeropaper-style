import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createUseStyles } from 'react-jss';

import { ReactComponent as Twitter } from '../../assets/twitter.svg';
import { ReactComponent as StackExchange } from '../../assets/stackexchange.svg';
import { ReactComponent as LinkedIn } from '../../assets/linkedin.svg';
import { ReactComponent as GitHub } from '../../assets/github.svg';
import { ExternalLink } from '../Link/Link';

const useStyles = createUseStyles(
  ({ mixins: { inlineListClasses } }) => ({
    ...inlineListClasses,
    link: {
      ...inlineListClasses.link,
      '& svg': {
        maxHeight: '1em',
      },
      '& svg path': {
        fill: 'currentColor',
      },
      // '&:hover svg path': {},
    },
  }),
  {
    name: 'SocialNetworks',
  },
);

const SocialNetworks = ({ className, classes: passedClasses, ...props }) => {
  const classes = useStyles(props);
  return (
    <nav className={classNames(classes.root, passedClasses?.root, className)}>
      <ul className={classNames(classes.list, passedClasses?.list)}>
        <li className={classes.item}>
          <ExternalLink
            className={classes.link}
            href="https://twitter.com/zeropaper"
          >
            <Twitter />
          </ExternalLink>
        </li>
        <li className={classes.item}>
          <ExternalLink
            className={classes.link}
            href="https://github.com/zeropaper"
          >
            <GitHub />
          </ExternalLink>
        </li>
        <li className={classes.item}>
          <ExternalLink
            className={classes.link}
            href="https://stackoverflow.com/users/story/662964"
          >
            <StackExchange />
          </ExternalLink>
        </li>
        <li className={classes.item}>
          <ExternalLink
            className={classes.link}
            href="https://www.linkedin.com/in/vvago"
          >
            <LinkedIn />
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
