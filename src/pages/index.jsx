/* eslint-disable react/prop-types */
import React from 'react';
import { graphql } from 'gatsby';
import { createUseStyles } from 'react-jss';

import Layout from '../components/Layout/Layout';
import SEO from '../components/Layout/SEO';

import Logo from '../components/Logo/Logo';

const useStyles = createUseStyles({
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
      stroke: 'none',
      fill: 'currentColor',
    },
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
      <SEO title="Valentin Vago" />

      <div className={classes.logoWrapper}>
        <Logo />
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
