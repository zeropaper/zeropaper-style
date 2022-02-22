import React from 'react';
import PropTypes from 'prop-types';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { graphql } from 'gatsby';
import Layout from '../components/Layout/Layout';
import TagsList from '../components/TagsList/TagsList';

const BlogTemplate = (props) => {
  const {
    data: {
      mdx,
    },
  } = props;

  const {
    body,
    frontmatter: {
      title,
      date,
      tags,
    } = {},
  } = mdx || {};

  return (
    <Layout component="article" contentType="text">
      {body && title && date
        ? (
          <>
            <header>
              <h1>{title}</h1>
              <h2>{date}</h2>
              <TagsList tags={tags} />
            </header>

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
      tags
      date(formatString: "MMMM Do, YYYY")
    }
  }
}
`;
