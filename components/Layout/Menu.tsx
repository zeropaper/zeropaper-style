import * as React from 'react';
import { createStyles as createUseStyles } from '@mantine/core';

import Link from '../Link/Link';
import { ClassNames } from '../../typings';

const useStyles = createUseStyles({
  root: {},
  list: {
    margin: 0,
    padding: 0,
    listStyle: 'none',
    display: 'flex',
  },
  item: {
    margin: '0 0.5em',
    '&:first-of-type': {
      marginLeft: 0,
    },
    '&:last-of-type': {
      marginRight: 0,
    },
  },
  link: {
    display: 'flex',
  },
});

interface PropTypes {
  className?: string;
  classes?: ClassNames<typeof useStyles>;
}

const Menu = ({
  className,
  classes: passedClasses,
}: PropTypes): React.ReactElement => {
  const { classes, cx } = useStyles();

  const links = [
    ['/hello', 'Hello'],
    ['/blog', 'Blog'],
    // ['/tags', 'Tags'],
    ['/stuff', 'Stuff'],
    // ['/contact', 'Contact'],
  ];

  return (
    <nav className={cx(classes.root, passedClasses?.root, className)}>
      <ul className={cx(classes.list, passedClasses?.list)}>
        {links.map((item) => (
          <li key={item[0]} className={classes.item}>
            <Link href={item[0]} className={classes.link}>
              {item[1]}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Menu;
