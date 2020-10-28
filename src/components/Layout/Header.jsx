import React from 'react';

import Link from '../Link';

const Header = () => {
  const classes = {};
  return (
    <header className={classes.root}>
      <Link
        to="/"
        className={classes.homeLink}
      >
        Valentin &quot;zeropaper&quot; Vago
      </Link>

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
    </header>
  );
};

export default Header;
