import React from 'react';
import { createUseStyles } from 'react-jss';

import Link from '../Link/Link';

const useStyles = createUseStyles({
  root: {
    display: 'flex',
  },
  list: {
    display: 'inline-flex',
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  item: {
  },
  link: {
  },
}, {
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
            about
          </Link>
        </li>

        <li className={classes.item}>
          <Link
            to="/contact"
            className={classes.link}
            activeClassName={classes.linkActive}
          >
            contact
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
