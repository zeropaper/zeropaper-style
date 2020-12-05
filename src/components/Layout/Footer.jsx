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
    position: 'fixed',
    bottom: 0,
    zIndex: 1000,
    width: '100%',
    fontSize: '0.85rem',
    background: shades[0],
  },
  column: {
    width: '33%',
  },
  menu: {
    width: '34%',
  },
  menuList: {
    margin: 'auto',
  },
  snList: {
    marginLeft: 'auto',
  },
}), {
  name: 'LayoutFooter',
});

const Footer = (props) => {
  const classes = useStyles(props);
  return (
    <footer className={classes.root}>
      <Link
        className={classes.column}
        to="/no-cookies"
      >
        No Cookies

      </Link>

      <Menu
        classes={{
          root: classes.menu,
          list: classes.menuList,
        }}
      />

      <SocialNetworks
        className={classes.column}
        classes={{
          list: classes.snList,
        }}
      />
    </footer>
  );
};

export default Footer;
