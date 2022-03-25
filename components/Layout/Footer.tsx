import * as React from 'react';
import { createStyles as createUseStyles } from '@mantine/core';
import Link from '../Link/Link';

import SocialNetworks from './SocialNetworks';
import { ClassNames } from '../../typings';

const useStyles = createUseStyles(
  ({ fn, spacing, colorScheme, white, colors }) => ({
    root: {
      position: 'sticky',
      bottom: 0,
      backgroundColor: colorScheme === 'light' ? white : colors.dark[7],
      [fn.smallerThan('xs')]: {
        fontSize: '1rem',
        flexDirection: 'column',
        alignItems: 'center',
      },
    },
    inner: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingTop: spacing.xs,
      paddingBottom: spacing.xs,
    },
    column: {},
    snList: {
      marginLeft: 'auto',
    },
  })
);

export type PropTypes = React.Attributes &
  React.HTMLAttributes<HTMLDivElement> & {
    classes?: ClassNames<typeof useStyles>;
  };

const Footer = ({ classes: passedClasses, className }: PropTypes) => {
  const { classes, cx } = useStyles();
  return (
    <footer className={cx(className, classes.root, passedClasses?.root)}>
      <div className={cx(classes.inner, passedClasses?.inner)}>
        <Link
          className={cx(classes.column, passedClasses?.column)}
          href="/no-cookies"
        >
          No Cookies
        </Link>

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
