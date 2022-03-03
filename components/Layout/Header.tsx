import * as React from 'react';
import { createStyles as createUseStyles, useMantineColorScheme, keyframes } from '@mantine/core';

import Link from '../Link/Link';
import Logo from '../Logo/Logo';
import Menu from './Menu';
import LightMode from './assets/light-mode.svg';
import DarkMode from './assets/dark-mode.svg';

const drawStroke = keyframes({
  '0%': {
    strokeDasharray: '200%',
    strokeDashoffset: '0%',
  },
  '100%': {
    strokeDasharray: '200%',
    strokeDashoffset: '400%',
  },
})

const useStyles = createUseStyles(({
  spacing
}, _params, getRef) => {
  const logo = getRef('logo');
  return ({
    root: {
      // display: 'flex',
      // alignItems: 'center',
      // paddingRight: spacing.sm,
      // paddingLeft: spacing.sm,
    },
    inner: {
      display: 'flex',
      alignItems: 'center',
      // flexGrow: 1
    },
    title: {
      fontWeight: 300,
      fontSize: 'min(32px, 7vw)',
      width: '33%',
    },
    titleLink: {
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      borderBottom: 'none',

      [`&:hover .${logo} path`]: {
        animationName: drawStroke,
      },
    },
    logo: {
      ref: logo,
      marginRight: spacing.sm,
      maxHeight: '1em',
      maxWidth: '1em',
      '& path': {
        stroke: 'currentColor',
        strokeWidth: 40,
        fill: 'none',
        animationDuration: '2s',
        // animationIterationCount: 'infinite',
        animationFillMode: 'forwards',
        animationTimingFunction: 'linear',
      },
    },
    linkText: {},
    menu: {
      width: '34%',
      display: 'block',
      textAlign: 'center',
      // [mobileLandscape]: {
      //   display: 'none',
      // },
    },
    themeToggleWrapper: {
      width: '33%',
      textAlign: 'right',
      // [mobileLandscape]: {
      //   width: 'auto',
      // },
    },
    themeToggle: {
      background: 'none',
      border: 'none',
      textDecoration: 'underline',
      font: 'inherit',
      cursor: 'pointer',
      color: 'inherit',
      display: 'inline-flex',
      alignItems: 'baseline',
      // padding: spacing(),
      // marginRight: spacing(-1),
    },
    themeModeIcon: {
      '& path': {
        fill: 'currentColor',
      },
    },
  })
});

const ThemeModeToggle = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const toggleMode = React.useCallback(() => toggleColorScheme(), [toggleColorScheme])
  const { classes, cx } = useStyles();
  return (
    <button
      type="button"
      title="Toggle the page styling theme"
      onClick={toggleMode}
      className={classes.themeToggle}
    >
      {
        colorScheme === 'dark'
        ? (
          <LightMode className={classes.themeModeIcon} />
        )
        : (
          <DarkMode className={classes.themeModeIcon} />
        )}
    </button>
  )
}

export type PropTypes = React.Attributes & React.HTMLAttributes<HTMLDivElement> & {
  classes?: ClassNames<typeof useStyles>;
};

const Header = ({ classes: passedClasses, className }: PropTypes) => {
  const {classes, cx} = useStyles();
  return (
    <header className={cx(className, classes.root, passedClasses?.root)}>
      <div className={cx(classes.inner, passedClasses?.inner)}>
        <h1 className={cx(classes.title, passedClasses?.title)} title="Valentin “zeropaper” Vago">
          <Link className={cx(classes.titleLink, passedClasses?.titleLink)} component="a" href="/">
            <Logo slim className={cx(classes.logo, passedClasses?.logo)} />

            <span>
              zeropaper
            </span>
          </Link>
        </h1>

        <Menu classes={{ root: classes.menu }} />

        <div className={cx(classes.themeToggleWrapper, passedClasses?.themeToggleWrapper)}>
          <ThemeModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
