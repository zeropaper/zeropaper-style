import React from 'react';
import PropTypes from 'prop-types';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { graphql } from 'gatsby';
import Layout from '../components/Layout/Layout';

const BlogTemplate = (props) => {
  const {
    data: {
      mdx,
    },
  } = props;

  const {
    body,
    frontmatter: { title, date } = {},
  } = mdx || {};

  return (
    <Layout>
      {body && title && date
        ? (
          <>
            <h1>{title}</h1>
            <h2>{date}</h2>
            <MDXRenderer>{body}</MDXRenderer>
          </>
        )
        : (
          <div>
            Something is seriously wrong.
            {console.warn('BlogTemplate', mdx)}
          </div>
        )}
    </Layout>
  );
};

BlogTemplate.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired,
};

export default BlogTemplate;

export const pageQuery = graphql`
query BlogPostBySlug($slug: String!) {
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
