import React from 'react';

import Link from '../Link';

const Header = () => {
  const classes = {};
  return (
    <nav className={classes.nav}>
      <ul className={classes.navList}>
        <li className={classes.navItem}>
          <Link
            to="/about"
            className={classes.navLink}
            activeClassName={classes.navLinkActive}
          >
            about
          </Link>
        </li>

        <li className={classes.navItem}>
          <Link
            to="/contact"
            className={classes.navLink}
            activeClassName={classes.navLinkActive}
          >
            contact
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
