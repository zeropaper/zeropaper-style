/* eslint-disable max-len */
import * as React from 'react';
import classNames from 'classnames';
import { createUseStyles } from 'react-jss';

import 'modern-css-reset';
import 'typeface-bungee-inline';
import 'typeface-roboto';

import Header from './Header';
import Footer from './Footer';
import { DefaultTheme } from '../../themes/Theme';

interface LayoutClassNames {
  main?: string;
  content?: string;
  header?: string;
  footer?: string;
}

export interface PageProps {
  children: React.ReactNode,
  component?: React.ComponentType<{ className?: string }>;
  classes?: LayoutClassNames;
  className?: string;
}

const useStyles = createUseStyles<DefaultTheme, string>(({
  typography: {
    fontSize,
    fontFamily,
    color,
  },
  background: {
    color: backgroundColor,
  },
  mixins: {
    textMain,
    textContent,
  },
}) => ({
  '@global': {
    html: {
      fontSize,
      height: '100%',
    },
    body: {
      fontSize,
      fontFamily,
      color,
      backgroundColor,
      height: '100%',
    },
    '#___gatsby, #gatsby-focus-wrapper, .tl-edges, .tl-wrapper': {
      width: '100%',
      height: '100%',
    },
    '#gatsby-focus-wrapper, .tl-wrapper': {
      display: 'flex',
      flexDirection: 'column',
    },

    '.tl-wrapper': {
      overflowX: 'hidden',
    },
    '.tl-wrapper > main': {
      transition: 'transform 1s',
    },
    '.tl-wrapper-status--entering > main': {
      transform: 'translateX(-100vw)',
      overflow: 'hidden',
    },
    '.tl-wrapper-status--entered > main': {
      transform: 'translateX(0vw)',
      overflow: 'auto',
    },
    '.tl-wrapper-status--exiting > main': {
      transform: 'translateX(100vw)',
      overflow: 'hidden',
    },
    '.tl-wrapper-status--exited > main': {
      transform: 'translateX(100vw)',
      overflow: 'hidden',
    },

    a: {
      color: 'inherit',
    },
    h1: {
      fontFamily: 'Bungee inline',
      fontWeight: 'normal',
    },
    'h1 a': {
      textDecoration: 'none',
      borderBottom: '2px solid currentColor',
    },
  },
  header: {},
  menu: {},
  main: ({ contentType }) => {
    const base = {
      flexGrow: 1,
      overflow: 'auto',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
    };
    if (contentType === 'text') return { ...base, ...textMain };
    return base;
  },
  content: ({ contentType }) => {
    const base = {
      flexGrow: 1,
    };
    if (contentType === 'text') return { ...base, ...textContent };
    return base;
  },
}), { name: 'Layout' });

const Layout = ({
  children,
  classes: passedClasses,
  ...props
}: PageProps) => {
  const classes = useStyles(props);
  const { component: Comp } = props;

  const mainClass = classNames(classes.main, passedClasses.main);
  const contentClass = classNames(classes.content, passedClasses.content);
  return (
    <>
      <Header className={classNames(classes.header, passedClasses.header)} />

      <main className={mainClass}>
        <Comp className={contentClass}>
          {children}
        </Comp>
      </main>

      <Footer className={classNames(classes.footer, passedClasses.footer)} />
    </>
  );
};

Layout.defaultProps = {
  component: 'div',
  classes: {},
  contentType: null,
};

export default Layout;
