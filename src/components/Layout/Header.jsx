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
    </header>
  );
};

export default Header;
