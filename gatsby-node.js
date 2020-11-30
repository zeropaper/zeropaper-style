const { resolve } = require('path');

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const blogPostLayout = resolve('src/components/Layout/Layout.jsx');

  const result = await graphql(`query blogPagesQuery {
  allMdx {
    nodes {
      slug
      frontmatter {
        title
      }
      parent {
        ... on File {
          sourceInstanceName
          name
          id
          atimeMs
          ctimeMs
          mtimeMs
        }
      }
    }
  }
}`);

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild('Error while running GraphQL query.');
    return;
  }

  result.data.allMdx.nodes.forEach(({
    slug,
    frontmatter,
    parent: {
      sourceInstanceName,
      atimeMs,
      ctimeMs,
      mtimeMs,
    },
  }) => {
    if (sourceInstanceName !== 'blog') return;

    const path = `blog/${slug}`;
    createPage({
      path,
      component: blogPostLayout,
      context: {
        pagePath: path,
        ...frontmatter,
        fileEvents: {
          accessed: atimeMs,
          changed: ctimeMs,
          modified: mtimeMs,
        },
      },
    });
  });
};
