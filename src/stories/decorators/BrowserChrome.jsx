import React from 'react';
import { createUseStyles } from 'react-jss';
// import { useLocation } from 'react-router-dom';

const useStyles = createUseStyles((theme) => ({
  '@global': {
    html: {
      fontSize: 14,
      fontFamily: 'Arial, Verdana',
    },
    'html, body, #root': {
      width: 'auto !important',
      height: 'auto !important',
      padding: '0 !important',
    },
    '#root': {
      display: 'flex',
      flexDirection: 'column',
      overflow: 'visible',
      backgroundColor: 'transparent',
      minHeight: '100vh',
    },
  },
  root: {
    margin: 16,
    borderRadius: 5,
    overflow: 'visible',
    display: 'flex',
    flexDirection: 'column',
    // eslint-disable-next-line max-len
    boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
    flexGrow: 1,
    background: theme?.palette?.type !== 'dark' ? 'lightgrey' : 'darkgrey',
  },
  bar: {
    display: 'flex',
    padding: 3,
    fontSize: 14,
  },
  barDots: {
    display: 'inline-flex',
    alignItems: 'center',
    marginLeft: 3,
  },
  barDot: {
    width: 12,
    height: 12,
    display: 'inline-block',
    borderRadius: 5,
    background: 'grey',
    marginRight: 6,
  },
  address: {
    flexGrow: 1,
    borderRadius: 3,
    background: theme?.palette?.type !== 'dark' ? 'white' : 'black',
    color: 'grey',
    padding: '2px 5px',
  },
  pageTitle: {
    flexGrow: 0,
    marginLeft: 3,
    opacity: 0.7,
  },
  inner: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',
    borderRadius: '0 0 5px 5px',
    background: theme?.palette?.type !== 'dark' ? 'white' : 'black',
  },
}), { name: 'BrowserChrome' });

// eslint-disable-next-line react/prop-types
const BrowserChrome = ({ children, ...props }) => {
  const classes = useStyles(props);
  // const location = useLocation();
  return (
    <div className={classes.root}>
      <div className={classes.bar}>
        <div className={classes.barDots}>
          <span className={classes.barDot} />
          <span className={classes.barDot} />
          <span className={classes.barDot} />
        </div>
        <div className={classes.address}>
          {
            // `…${location.pathname}${location.search}${location.hash}`
          }
        </div>
        <div className={[classes.address, classes.pageTitle].join(' ')}>
          {
            // Page title: TODO
          }
        </div>
      </div>
      <div className={classes.inner}>
        {children}
      </div>
    </div>
  );
};

export default BrowserChrome;

export const withBrowserChrome = (Story, context) => {
  const { globals: { theme: mode = 'light' } = {} } = context;
  return (
    <BrowserChrome mode={mode}>
      <Story />
    </BrowserChrome>
  );
};
