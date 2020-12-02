/* eslint-disable react/prop-types */
import React from 'react';
import { graphql } from 'gatsby';
import { createUseStyles } from 'react-jss';

import Layout from '../components/Layout/Layout';
import SEO from '../components/Layout/SEO';

import Logo from '../components/Logo/Logo';
import Link from '../components/Link/Link';

const useStyles = createUseStyles({
  '@keyframes drawStroke': {
    '0%': {
      strokeDasharray: '200%',
      strokeDashoffset: '-200%',
    },
    '25%': {
      strokeDasharray: '200%',
      strokeDashoffset: '0%',
    },
    '75%': {
      strokeDasharray: '200%',
      strokeDashoffset: '0%',
    },
    '100%': {
      strokeDasharray: '200%',
      strokeDashoffset: '200%',
    },
  },
  '@keyframes collapseLogo': {
    from: {
      // maxWidth: '50vh',
      maxHeight: '50vh',
    },
    to: {
      // maxWidth: 0,
      maxHeight: 0,
    },
  },
  root: {},
  layoutMain: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  logoWrapper: {
    textAlign: 'center',
    overflow: 'hidden',
    flexGrow: 1,
  },
  logo: {
    margin: 'auto',
    maxWidth: '50vh',
    maxHeight: '50vh',
    '& path': {
      strokeWidth: 10,
      stroke: 'currentColor',
      fill: 'none',
      animationDuration: '2s',
      // animationIterationCount: 'infinite',
      animationTimingFunction: 'linear',
      animationFillMode: 'both',
      // },
      // '&:hover path': {
      animationName: '$drawStroke',
    },
    animationName: '$collapseLogo',
    animationDelay: '2s',
    animationDuration: '1s',
    animationTimingFunction: 'linear',
    animationFillMode: 'both',
  },
  aboutLink: {
    fontSize: 'max(2rem, 5vw)',
    textDecoration: 'none',
  },
}, { name: 'IndexPage' });

const IndexPage = () => {
  const classes = useStyles();
  return (
    <Layout
      classes={{
        main: classes.layoutMain,
      }}
    >
      <SEO title="Personal web page of Valentin &quot;zeropaper&quot; Vago" />

      <div className={classes.logoWrapper}>
        <Logo slim className={classes.logo} />
      </div>

      <div className={classes.logoWrapper}>
        <h1>
          <Link to="/hello" className={classes.aboutLink}>
            Hello
          </Link>
        </h1>
      </div>
    </Layout>
  );
};

export const query = graphql`{
  site {
    siteMetadata {
      title
      description
    }
  }
}`;

export default IndexPage;
