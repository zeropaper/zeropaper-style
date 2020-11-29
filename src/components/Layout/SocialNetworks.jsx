import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createUseStyles } from 'react-jss';

import { ReactComponent as Twitter } from '../../assets/icons/twitter.svg';
import { ReactComponent as StackExchange } from '../../assets/icons/stackexchange.svg';
import { ReactComponent as LinkedIn } from '../../assets/icons/linkedin.svg';
import { ReactComponent as GitHub } from '../../assets/icons/github.svg';

const useStyles = createUseStyles(({ mixins: { inlineListClasses } }) => ({
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
}), {
  name: 'SocialNetworks',
});

const SocialNetworks = ({ className, classes: passedClasses, ...props }) => {
  const classes = useStyles(props);
  return (
    <nav className={classNames(classes.root, passedClasses?.root, className)}>
      <ul className={classNames(classes.list, passedClasses?.list)}>
        <li className={classes.item}>
          <a className={classes.link} href="https://twitter.com/zeropaper">
            <Twitter />
          </a>
        </li>
        <li className={classes.item}>
          <a className={classes.link} href="https://github.com/zeropaper">
            <GitHub />
          </a>
        </li>
        <li className={classes.item}>
          <a className={classes.link} href="https://stackoverflow.com/users/story/662964">
            <StackExchange />
          </a>
        </li>
        <li className={classes.item}>
          <a className={classes.link} href="https://www.linkedin.com/in/vvago">
            <LinkedIn />
          </a>
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
