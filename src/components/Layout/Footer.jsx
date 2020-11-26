import React from 'react';
import { createUseStyles } from 'react-jss';
import Link from '../Link/Link';

import Menu from './Menu';
import SocialNetworks from './SocialNetworks';

const useStyles = createUseStyles(({
  background: {
    shades,
  },
}) => ({
  root: {
    padding: 10,
    display: 'flex',
    justifyContent: 'space-around',
    position: 'sticky',
    bottom: 0,
    zIndex: 1000,
    width: '100%',
    fontSize: '0.85rem',
    background: shades[0],
  },
}), {
  name: 'LayoutFooter',
});

const Footer = (props) => {
  const classes = useStyles(props);
  return (
    <footer className={classes.root}>
      <Link to="/no-cookies">No Cookies</Link>
      <Menu className={classes.menu} />
      <SocialNetworks />
    </footer>
  );
};

export default Footer;
