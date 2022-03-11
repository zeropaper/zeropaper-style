import React from 'react';

import Layout from '../Layout/Layout';
import IFrame from '../IFrame/IFrame';
import { MDXRenderer } from '../MDXRenderer/MDXRenderer';

export const StuffPage = (props: any) => {
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
    frontmatter: { title, tags } = { title: '', tags: [] },
  } = mdx || {};

  let content = null;
  if (iframe) {
    content = (
      <IFrame
        title={title}
        iframe={iframe}
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
        <MDXRenderer content={body} />
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
export default StuffPage