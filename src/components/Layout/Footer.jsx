import React from 'react';
import { createUseStyles } from 'react-jss';

import Menu from './Menu';

const useStyles = createUseStyles({
  root: {
    padding: 10,
  },
}, {
  name: 'LayoutFooter',
});

const Footer = (props) => {
  const classes = useStyles(props);
  return (
    <footer className={classes.root}>
      <Menu className={classes.menu} />
    </footer>
  );
};

export default Footer;
