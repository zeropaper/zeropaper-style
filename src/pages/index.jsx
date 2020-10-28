/* eslint-disable react/prop-types */
import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/Layout/Layout';
import SEO from '../components/Layout/SEO';

const IndexPage = () => (
  <Layout noHeader animGrid>
    <SEO title="Valentin Vago" />
  </Layout>
);

export const query = graphql`{
  site {
    siteMetadata {
      title
      description
    }
  }
}`;

export default IndexPage;
