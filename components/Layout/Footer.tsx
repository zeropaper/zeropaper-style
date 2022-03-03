import * as React from 'react';
import { createStyles as createUseStyles } from '@mantine/core';
// import { DefaultTheme } from '../../themes/Theme';
import Link from '../Link/Link';

import Menu from './Menu';
import SocialNetworks from './SocialNetworks';

const useStyles = createUseStyles(({
  spacing,
  // mediaQueries: {
  //   mobilePortrait,
  //   mobileLandscape,
  // },
  // typography: {
  //   shades,
  // },
}) => ({
  root: {
    // padding: spacing(),
    // width: '100%',
    // borderTop: `1px solid ${shades[7]}`,
    // [mobilePortrait]: {
    //   fontSize: '1rem',
    //   flexDirection: 'column',
    //   alignItems: 'center',
    // },
  },
  inner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  column: {
    // [mobileLandscape]: {
    //   width: '33%',
    // },
    // [mobilePortrait]: {
    //   textAlign: 'center',
    // },
  },
  menu: {
    display: 'none',
    // [mobileLandscape]: {
    //   display: 'block',
    // },
    // [mobilePortrait]: {
    //   display: 'block',
    //   marginTop: spacing(),
    //   marginBottom: spacing(),
    // },
  },
  menuList: {
    margin: 'auto',
  },
  snList: {
    marginLeft: 'auto',
  },
}));


export type PropTypes = React.Attributes & React.HTMLAttributes<HTMLDivElement> & {
  classes?: ClassNames<typeof useStyles>;
}

const Footer = ({ classes: passedClasses, className }: PropTypes) => {
  const {classes, cx} = useStyles();
  return (
    <footer className={cx(className, classes.root, passedClasses?.root)}>
      <div className={cx(classes.inner, passedClasses?.inner)}>
        <Link
          className={cx(classes.column, passedClasses?.column)}
          href="/no-cookies"
        >
          No Cookies
        </Link>
{/* 
        <Menu
          classes={{
            root: classes.menu,
            list: classes.menuList,
          }}
        /> */}

        <SocialNetworks
          className={cx(classes.column, passedClasses?.column)}
          classes={{
            list: classes.snList,
          }}
        />
      </div>
    </footer>
  );
};

export default Footer;
