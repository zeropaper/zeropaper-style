import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createUseStyles } from 'react-jss';

import 'modern-css-reset';

import Header from './Header';
import Menu from './Menu';
import Footer from './Footer';
// import { useAssets } from '../AssetsProvider/Context';

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
  },
  header: {},
  menu: {},
  main: {},
  bodyOverlayVisible: {},
  overlay: {},
  overlayVisible: {},
  iqwsiuqhs: {},
  iqwsiuqhsVisible: {},
}, { name: 'Layout ' });

const Layout = ({ children, ...props }) => {
  // const assets = useAssets();
  // console.info('Layout assets', assets);

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
    document.body.classList[visible ? 'add' : 'remove'](classes.bodyOverlayVisible);
  }, [visible]);

  return (
    <>
      <Header
        className={classes.header}
      />

      <Menu
        className={classes.menu}
      />

      <main
        className={classNames(classes.main, classes.iqwsiuqhs, {
          [classes.iqwsiuqhsVisible]: visible,
        })}
      >
        <div
          className={classNames(classes.overlay, {
            [classes.overlayVisible]: visible,
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
};

Layout.defaultProps = {
};

export default Layout;
