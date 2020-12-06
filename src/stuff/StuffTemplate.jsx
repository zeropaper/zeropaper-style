import React from 'react';
import PropTypes from 'prop-types';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { graphql } from 'gatsby';
import Layout from '../components/Layout/Layout';

const StuffTemplate = ({
  data,
}) => {
  const { allMdx } = data;
  const { frontmatter } = allMdx;
  return (
    <Layout>
      <h1>{frontmatter.title}</h1>
      <h2>{frontmatter.date}</h2>
      <MDXRenderer>{data.body}</MDXRenderer>
    </Layout>
  );
};

StuffTemplate.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired,
};

export default StuffTemplate;

export const pageQuery = graphql`
query StuffPostBySlug($slug: String!) {
  mdx(frontmatter: {slug: {eq: $slug}}) {
    body
    frontmatter {
      slug
      title
      date
    }
  }
}
`;
