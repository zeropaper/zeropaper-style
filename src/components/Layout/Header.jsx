import React from 'react';
import { createUseStyles } from 'react-jss';

import { ReactComponent as Zeropaper } from '../../assets/images/zeropaper-fat.svg';
import Link from '../Link';
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
  title: {},
  titleLink: {
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    marginRight: 10,
    maxHeight: '1em',
    maxWidth: '1em',
    '& path': {
      stroke: 'none',
      fill: 'currentColor',
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
          <Zeropaper className={classes.logo} />

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
