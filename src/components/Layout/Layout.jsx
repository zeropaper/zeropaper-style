/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createUseStyles } from 'react-jss';
import { TransitionState } from 'gatsby-plugin-transition-link';

import 'modern-css-reset';
// import 'typeface-bungee-hairline';
import 'typeface-bungee-inline';
import 'typeface-roboto';

import Header from './Header';
import Footer from './Footer';

const useStyles = createUseStyles(({
  spacing,
  typography: {
    fontSize,
    fontFamily,
    color,
  },
  background: {
    color: backgroundColor,
  },
}) => ({
  '@global': {
    html: {
      fontSize,
    },
    body: {
      fontSize,
      fontFamily,
      color,
      backgroundColor,
      position: 'relative',
    },
    '#___gatsby, #gatsby-focus-wrapper, .tl-edges, .tl-wrapper': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      overflow: 'auto',
    },
    '#gatsby-focus-wrapper, .tl-wrapper': {
      display: 'flex',
      flexDirection: 'column',
    },
    a: {
      color: 'inherit',
    },
    h1: {
      fontFamily: 'Bungee inline',
      fontWeight: 'normal',
    },
  },
  header: {},
  menu: {},
  main: ({ contentType }) => {
    const base = {
      flexGrow: 1,
      padding: spacing(2),
    };
    if (contentType === 'text') {
      base.marginTop = '13vw';
      base.width = '100%';
      base.maxWidth = 800;
      base.margin = 'auto';
      base['& p'] = {
        marginBottom: '0.618em',
        fontSize: '1.2rem',
      };
      base['& h1'] = {
        marginBottom: '1.618em',
        fontSize: 'max(2rem, 5vw)',
      };
      base['& code'] = {
        fontSize: '0.9em',
      };
    }
    return base;
  },
  content: {},
}), { name: 'Layout' });

const Layout = ({
  children,
  classes: passedClasses,
  ...props
}) => {
  const classes = useStyles(props);

  return (
    <>
      <Header
        className={classNames(classes.header, passedClasses.header)}
      />

      <TransitionState>
        {({
          transitionStatus,
          exit,
          entry,
          mount,
        }) => {
          const mainClass = classNames(classes.main, classes.main, passedClasses.main);
          const contentClass = classNames(classes.content, passedClasses.content);
          return (
            <main
              className={classNames(classes.main, classes.main, passedClasses.main)}
            >
              <div
                className={classNames(classes.mainContent, passedClasses.mainContent)}
              >
                {children}
              </div>
            </main>
          );
        }}
      </TransitionState>

      <Footer />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.shape({
    header: PropTypes.string,
    menu: PropTypes.string,
    main: PropTypes.string,
    content: PropTypes.string,
  }),
};

Layout.defaultProps = {
  classes: {},
};

export default Layout;
