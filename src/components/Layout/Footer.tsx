import * as React from 'react';
import { createUseStyles } from 'react-jss';
import { DefaultTheme } from '../../themes/Theme';
import Link from '../Link/Link';

import Menu from './Menu';
import SocialNetworks from './SocialNetworks';

const useStyles = createUseStyles(({
  spacing,
  mediaQueries: {
    mobilePortrait,
    mobileLandscape,
  },
  typography: {
    shades,
  },
}: DefaultTheme) => ({
  root: {
    padding: spacing(),
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
    borderTop: `1px solid ${shades[7]}`,
    [mobilePortrait]: {
      fontSize: '1rem',
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  column: {
    [mobileLandscape]: {
      width: '33%',
    },
    [mobilePortrait]: {
      textAlign: 'center',
    },
  },
  menu: {
    display: 'none',
    [mobileLandscape]: {
      display: 'block',
    },
    [mobilePortrait]: {
      display: 'block',
      marginTop: spacing(),
      marginBottom: spacing(),
    },
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
