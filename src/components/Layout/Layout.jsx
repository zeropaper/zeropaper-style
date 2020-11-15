import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createUseStyles } from 'react-jss';

import 'modern-css-reset';

import Header from './Header';
import Footer from './Footer';

const useStyles = createUseStyles({
  '@global': {
    body: {
      position: 'relative',
    },
    '#___gatsby, #gatsby-focus-wrapper': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      overflow: 'auto',
    },
    '#gatsby-focus-wrapper': {
      display: 'flex',
      flexDirection: 'column',
    },
    a: {
      color: 'inherit',
      textDecoration: 'none',
    },
  },
  header: {},
  menu: {},
  main: {
    flexGrow: 1,
    padding: 10,
  },
  bodyOverlayVisible: {},
  overlay: {},
  overlayVisible: {},
  mainVisible: {},
}, { name: 'Layout ' });

const Layout = ({
  children,
  classes: passedClasses,
  ...props
}) => {
  const classes = useStyles(props);

  const [visible, setVisible] = React.useState(true);

  const handleMouseMove = () => setVisible(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 1500);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', handleMouseMove, { passive: true });
    };
  });

  React.useEffect(() => {
    document.body.classList[visible ? 'add' : 'remove'](classes.bodyOverlayVisible, passedClasses.bodyOverlayVisible);
  }, [visible]);

  return (
    <>
      <Header
        className={classNames(classes.header, passedClasses.header)}
      />

      <main
        className={classNames(classes.main, classes.main, passedClasses.main, {
          [classes.mainVisible]: visible,
          [passedClasses.mainVisible]: visible,
        })}
      >
        <div
          className={classNames(classes.overlay, passedClasses.overlay, {
            [classes.overlayVisible]: visible,
            [passedClasses.overlayVisible]: visible,
          })}
        >
          {children}
        </div>
      </main>

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
    mainVisible: PropTypes.string,
    bodyOverlayVisible: PropTypes.string,
    overlay: PropTypes.string,
    overlayVisible: PropTypes.string,
  }),
};

Layout.defaultProps = {
  classes: {},
};

export default Layout;
