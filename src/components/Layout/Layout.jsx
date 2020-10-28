import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useStaticQuery, graphql } from 'gatsby';

import Header from './Header';
import Footer from './Footer';
import { useAssets } from '../AssetsProvider/Context';

// eslint-disable-next-line react/prop-types
const LayoutBase = ({ children, noHeader }) => {
  const classes = {};
  return (
    <>
      {!noHeader && (
        <Header
          className={classes.header}
        />
      )}

      <nav className={classes.menu}>
        TODO: menu
      </nav>

      <main className={classes.main}>
        {children}
      </main>

      <Footer />
    </>
  );
};

const Layout = ({
  children,
  noHeader,
}) => {
  const classes = {};

  const assets = useAssets();
  console.info('Layout assets', assets);

  const [visible, setVisible] = React.useState(true);
  const handleMouseMove = () => !visible && setVisible(true);
  React.useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 1500);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', handleMouseMove, { passive: true });
    };
  });

  const data = useStaticQuery(graphql`{
  site {
    siteMetadata {
      title
    }
  }
}`);

  return (
    <LayoutBase
      focus={visible}
      data={data}
      noHeader={noHeader}
      className={classes.root}
    >
      <div
        className={classNames(classes.innerlay, {
          [classes.innerlayVisible]: visible,
        })}
      >
        <div
          className={classNames(classes.overlay, {
            [classes.overlayVisible]: visible,
          })}
        >
          {children}
        </div>
      </div>
    </LayoutBase>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  noHeader: PropTypes.bool,
};

Layout.defaultProps = {
  noHeader: false,
};

export default Layout;
