import React from 'react';
import { createUseStyles } from 'react-jss';

import Link from '../Link/Link';
import Logo from '../Logo/Logo';
import Menu from './Menu';

const useStyles = createUseStyles({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    padding: {
      left: 10,
      right: 10,
    },
  },
  title: {
    fontWeight: 100,
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
      strokeWidth: 50,
      fill: 'none',
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

      <Menu />
    </header>
  );
};

export default Header;
