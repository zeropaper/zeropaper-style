/* eslint-disable react/prop-types */
import React from 'react';
import { graphql } from 'gatsby';
import { createUseStyles } from 'react-jss';

import Layout from '../components/Layout/Layout';
import SEO from '../components/Layout/SEO';
import Link from '../components/Link/Link';

const useStyles = createUseStyles({
}, { name: 'BlogPage' });

const BlogPage = ({
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
      <SEO title="Personal blog of Valentin &quot;zeropaper&quot; Vago" />

      <ol>
        {nodes.map(({ context: { slug, title, date } }) => (
          <li key={slug}>
            {date}
            <Link to={`/blog/${slug}`}>
              {title}
            </Link>
          </li>
        ))}
      </ol>
    </Layout>
  );
};

export const query = graphql`
query BlogPosts {
  allSitePage(filter: {context: {pageType: {eq: "blog"}}}, sort: {fields: context___date, order: DESC}) {
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

export default BlogPage;
