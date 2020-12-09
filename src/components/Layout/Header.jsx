import React from 'react';
import { createUseStyles, useTheme } from 'react-jss';

import Link from '../Link/Link';
import Logo from '../Logo/Logo';

const useStyles = createUseStyles(({
  typography: {
    shades,
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: {
      left: 10,
      right: 10,
    },
    borderBottom: `1px solid ${shades[7]}`,
  },
  title: {
    fontWeight: 300,
    fontSize: 'min(32px, 7vw)',
    fontFamily: 'Roboto',
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
    marginRight: 10,
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
  themeToggle: {
    background: 'none',
    border: 'none',
    textDecoration: 'underline',
    font: 'inherit',
    cursor: 'pointer',
    color: 'inherit',
  },
}), {
  name: 'LayoutHeader',
});

const Header = (props) => {
  const { toggleMode, mode } = useTheme();
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

      <button
        type="button"
        title="Toggle the page styling theme"
        onClick={toggleMode}
        className={classes.themeToggle}
      >
        {`${mode === 'dark' ? 'light' : 'dark'} theme`}
      </button>
    </header>
  );
};

export default Header;
