import React from 'react';
import PropTypes from 'prop-types';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { graphql } from 'gatsby';

import Layout from '../components/Layout/Layout';
import IFrame from '../components/IFrame/Iframe';

const StuffTemplate = (props) => {
  const {
    data: {
      mdx,
    },
    pageContext: {
      iframe,
      description,
      source,
    },
  } = props;

  const {
    body,
    frontmatter: { title, tags } = {},
  } = mdx || {};

  let content = null;
  if (iframe) {
    content = (
      <IFrame
        title={title}
        src={iframe}
        description={description}
        source={source}
        mdx={body}
        tags={tags}
      />
    );
  } else if (body && title) {
    content = (
      <>
        <h1>{title}</h1>
        <MDXRenderer>{body}</MDXRenderer>
      </>
    );
  } else {
    content = (
      <div>
        Something is seriously wrong.
        {console.warn('StuffTemplate', mdx)}
      </div>
    );
  }

  return (
    <Layout>
      {content}
    </Layout>
  );
};

StuffTemplate.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.shape({
    iframe: PropTypes.string,
    description: PropTypes.string,
    source: PropTypes.string,
  }).isRequired,
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
    }
  }
}
`;
