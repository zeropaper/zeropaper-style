const { resolve } = require('path');

// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  // Create pages for each markdown file.
  const blogPostLayout = resolve('src/components/Layout/Layout.jsx');

  // Query for markdown nodes to use in creating pages.
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
    parent: { sourceInstanceName },
  }) => {
    if (sourceInstanceName !== 'blog') return;

    const path = `blog/${slug}`;
    createPage({
      path,
      component: blogPostLayout,
      // In your blog post template's graphql query, you can use pagePath
      // as a GraphQL variable to query for data from the markdown file.
      context: {
        pagePath: path,
        ...frontmatter,
      },
    });
  });
};
