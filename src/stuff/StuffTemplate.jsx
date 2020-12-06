import React from 'react';
import PropTypes from 'prop-types';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { graphql } from 'gatsby';
import Layout from '../components/Layout/Layout';

const StuffTemplate = (props) => {
  const {
    data: {
      mdx,
    },
  } = props;

  const {
    body,
    frontmatter: { title } = {},
  } = mdx || {};

  return (
    <Layout>
      {body && title
        ? (
          <>
            <h1>{title}</h1>
            <MDXRenderer>{body}</MDXRenderer>
          </>
        )
        : (
          <div>
            Something is seriously wrong.
            {console.warn('StuffTemplate', mdx)}
          </div>
        )}
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
      tags
      description
    }
  }
}
`;
