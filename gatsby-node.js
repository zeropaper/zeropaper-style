const { resolve } = require('path');

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const blogPostLayout = resolve('src/blog/BlogTemplate.jsx');
  const stuffPostLayout = resolve('src/stuff/StuffTemplate.jsx');
  // const DefaultTemplate = resolve('src/components/DefaultTemplate.jsx');
  const LinksListTemplate = resolve('src/components/LinksListTemplate.jsx');

  const result = await graphql(`query mdxPagesQuery {
  allMdx(sort: {fields: frontmatter___date, order: DESC}) {
    nodes {
      frontmatter {
        title
        slug
        date
        tags
        description
        iframe
        source
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

  const allPageTypes = {};
  const allTags = {};

  result.data.allMdx.nodes.forEach(({
    frontmatter,
    parent: {
      sourceInstanceName: pageType,
    },
  }) => {
    const path = `${pageType}/${frontmatter.slug}`;

    if (!allPageTypes[pageType]) allPageTypes[pageType] = [];
    allPageTypes[pageType].push({ ...frontmatter, to: `/${path}` });

    (frontmatter.tags || []).forEach((tag) => {
      if (!allTags[tag]) allTags[tag] = [];
      allTags[tag].push({ ...frontmatter, to: `/${path}` });
    });

    switch (pageType) {
      case 'blog':
        createPage({
          path,
          component: blogPostLayout,
          context: {
            date: '2020-12-06',
            description: '',
            tags: [],
            pageType,
            ...frontmatter,
          },
        });
        break;

      case 'stuff':
        createPage({
          path,
          component: stuffPostLayout,
          context: {
            date: '2020-12-06',
            description: '',
            tags: [],
            pageType,
            ...frontmatter,
          },
        });
        break;

      default:
        break;
    }
  });

  Object.keys(allPageTypes).forEach((pageType) => {
    createPage({
      path: pageType,
      component: LinksListTemplate,
      context: {
        list: 'pages',
        pageTitle: `All "${pageType}" content`,
        pageType: `${pageType}List`,
        pages: allPageTypes[pageType],
      },
    });
  });

  Object.keys(allTags).forEach((tag) => {
    createPage({
      path: `tags/${tag}`,
      component: LinksListTemplate,
      context: {
        pageTitle: `All content tagged with "${tag}"`,
        list: 'pages',
        tag,
        pages: allTags[tag],
      },
    });
  });

  createPage({
    path: 'tags',
    component: LinksListTemplate,
    context: {
      pageTitle: 'All tags',
      list: 'allTags',
      allTags,
    },
  });
};
