import React from 'react';
import { createUseStyles } from 'react-jss';

import Link from '../Link/Link';

const useStyles = createUseStyles(({ mixins: { inlineListClasses } }) => ({
  ...inlineListClasses,
}), {
  name: 'LayoutMenu',
});

const Header = (props) => {
  const classes = useStyles(props);
  return (
    <nav className={classes.root}>
      <ul className={classes.list}>
        <li className={classes.item}>
          <Link
            to="/about"
            className={classes.link}
            activeClassName={classes.linkActive}
          >
            About
          </Link>
        </li>

        <li className={classes.item}>
          <Link
            to="/contact"
            className={classes.link}
            activeClassName={classes.linkActive}
          >
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
