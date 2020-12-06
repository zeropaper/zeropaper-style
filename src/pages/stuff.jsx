/* eslint-disable react/prop-types */
import React from 'react';
import { graphql } from 'gatsby';
import { createUseStyles } from 'react-jss';

import Layout from '../components/Layout/Layout';
import SEO from '../components/Layout/SEO';
import Link from '../components/Link/Link';

const useStyles = createUseStyles({
}, { name: 'StuffPage' });

const StuffPage = ({
  data: {
    allSitePage: {
      nodes,
    },
  },
}) => {
  const classes = useStyles();
  return (
    <Layout
      classes={{
        main: classes.layoutMain,
      }}
    >
      <SEO title="Valentin &quot;zeropaper&quot; Vago personal stuff" />

      <ol>
        {nodes.map(({ context: { slug, title } }) => (
          <li key={slug}>
            <Link to={`/stuff/${slug}`}>
              {title}
            </Link>
          </li>
        ))}
      </ol>
    </Layout>
  );
};

export const query = graphql`
query StuffPosts {
  allSitePage(filter: {context: {pageType: {eq: "stuff"}}}, sort: {fields: context___date, order: DESC}) {
    nodes {
      context {
        slug
        title
        date
      }
    }
  }
}
`;

export default StuffPage;
