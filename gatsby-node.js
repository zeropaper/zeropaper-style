const { resolve } = require('path');

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const blogPostLayout = resolve('src/blog/BlogTemplate.jsx');
  const stuffPostLayout = resolve('src/stuff/StuffTemplate.jsx');

  const result = await graphql(`query mdxPagesQuery {
  allMdx {
    nodes {
      frontmatter {
        title
        slug
        date
        tags
        description
      }
      parent {
        ... on File {
          sourceInstanceName
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
    frontmatter,
    parent: {
      sourceInstanceName,
    },
  }) => {
    switch (sourceInstanceName) {
      case 'blog':
        createPage({
          path: `blog/${frontmatter.slug}`,
          component: blogPostLayout,
          context: {
            date: '2020-12-06',
            description: '',
            tags: [],
            pageType: sourceInstanceName,
            ...frontmatter,
          },
        });
        break;

      case 'stuff':
        createPage({
          path: `stuff/${frontmatter.slug}`,
          component: stuffPostLayout,
          context: {
            date: '2020-12-06',
            description: '',
            tags: [],
            pageType: sourceInstanceName,
            ...frontmatter,
          },
        });
        break;

      default:
        break;
    }
  });
};
