import React from 'react';

import Link from '../Link';

const Footer = () => {
  const classes = {};
  return (
    <footer className={classes.root}>
      <nav>
        <ul className={classes.list}>
          <li className={classes.item}>
            <Link to="/about">About</Link>
          </li>
          <li className={classes.item}>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
