import React from 'react';
import { createUseStyles } from 'react-jss';

import Link from '../Link/Link';
import Logo from '../Logo/Logo';
// import Menu from './Menu';

const useStyles = createUseStyles({
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

    '&:hover $logo path': {
      animationName: '$drawStroke',
    },
  },
  title: {
    fontWeight: 300,
    fontSize: 'min(32px, 5vw)',
    fontFamily: 'Roboto',
  },
  titleLink: {
    display: 'flex',
    alignItems: 'center',
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
}, {
  name: 'LayoutHeader',
});

const Header = (props) => {
  const classes = useStyles(props);
  return (
    <header className={classes.root}>
      <h1 className={classes.title}>
        <Link to="/" className={classes.titleLink}>
          <Logo slim className={classes.logo} />

          <span>
            Valentin &quot;zeropaper&quot; Vago
          </span>
        </Link>
      </h1>

      {/* <Menu /> */}
    </header>
  );
};

export default Header;
