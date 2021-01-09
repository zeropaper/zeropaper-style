import * as React from 'react';
import { createUseStyles, useTheme } from 'react-jss';

import Link from '../Link/Link';
import Logo from '../Logo/Logo';
import Menu from './Menu';
import { ReactComponent as LightMode } from '../../assets/light-mode.svg';
import { ReactComponent as DarkMode } from '../../assets/dark-mode.svg';
import { DefaultTheme } from '../../themes/Theme';

const useStyles = createUseStyles<DefaultTheme, string>(({
  spacing,
  typography: {
    shades,
  },
  mediaQueries: {
    mobileLandscape,
  },
}) => ({
  '@keyframes drawStroke': {
    '0%': {
      strokeDasharray: '200%',
      strokeDashoffset: '0%',
    },
    '100%': {
      strokeDasharray: '200%',
      strokeDashoffset: '400%',
    },
  },

  root: {
    display: 'flex',
    alignItems: 'center',
    padding: {
      left: spacing(2),
      right: spacing(2),
    },
    borderBottom: `1px solid ${shades[7]}`,
    [mobileLandscape]: {
      justifyContent: 'space-between',
    },
  },
  title: {
    fontWeight: 300,
    fontSize: 'min(32px, 7vw)',
    fontFamily: 'Roboto',
    width: '33%',
    [mobileLandscape]: {
      width: 'auto',
    },
  },
  titleLink: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    borderBottom: 'none',

    '&:hover $logo path': {
      animationName: '$drawStroke',
    },
  },
  logo: {
    marginRight: spacing(1),
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
    [mobileLandscape]: {
      display: 'none',
    },
  },
  themeToggleWrapper: {
    width: '33%',
    textAlign: 'right',
    [mobileLandscape]: {
      width: 'auto',
    },
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
    padding: spacing(),
    marginRight: spacing(-1),
  },
  themeModeIcon: {
    '& path': {
      fill: 'currentColor',
    },
  },
}), {
  name: 'LayoutHeader',
});

const Header = (props) => {
  const { toggleMode, mode }: DefaultTheme = useTheme();
  const classes = useStyles(props);
  return (
    <header className={classes.root}>
      <h1 className={classes.title} title="Valentin “zeropaper” Vago">
        <Link to="/" className={classes.titleLink}>
          <Logo slim className={classes.logo} />

          <span>
            zeropaper
          </span>
        </Link>
      </h1>

      <Menu classes={{ root: classes.menu }} />

      <div className={classes.themeToggleWrapper}>
        <button
          type="button"
          title="Toggle the page styling theme"
          onClick={toggleMode}
          className={classes.themeToggle}
        >
          {mode === 'dark'
            ? (
              <LightMode className={classes.themeModeIcon} />
            )
            : (
              <DarkMode className={classes.themeModeIcon} />
            )}
        </button>
      </div>
    </header>
  );
};

export default Header;
