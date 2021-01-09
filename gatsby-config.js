const theme = require('./src/themes/data');
const appIcons = require('./src/assets/app-icons');

module.exports = {
  flags: {
    QUERY_ON_DEMAND: true,
    LAZY_IMAGES: true,
    DEV_SSR: true,
  },
  siteMetadata: {
    title: 'Valentin Vago',
    description: 'Personal web page of Valentin Vago aka zeropaper.',
    author: 'Valentin "zeropaper" Vago',
  },
  plugins: [
    'gatsby-plugin-better-jss',
    'gatsby-plugin-react-helmet',

    {
      resolve: 'gatsby-plugin-svgr',
      options: {
        // use prettier to format JS code output (default: true)
        prettier: false,
        // use svgo to optimize SVGs (default: true)
        svgo: false,
        svgoConfig: {
          // remove viewBox when possible (default: true)
          removeViewBox: false,
          // remove unused IDs and minify remaining IDs (default: true)
          cleanupIDs: true,
        },
      },
    },

    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: `${__dirname}/src/pages`,
      },
    },

    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'blog',
        path: `${__dirname}/src/blog`,
      },
    },

    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'stuff',
        path: `${__dirname}/src/stuff`,
      },
    },

    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/assets/images`,
      },
    },

    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.mdx', '.md'],

        gatsbyRemarkPlugins: [
          'gatsby-plugin-sharp',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 800,
              backgroundColor: 'transparent',
            },
          },
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
          {
            resolve: 'gatsby-remark-table-of-contents',
            options: {
              exclude: 'Table of Contents',
              tight: true,
              ordered: true,
              fromHeading: 2,
              toHeading: 6,
              // className: 'toc',
            },
          },
          {
            resolve: 'gatsby-remark-autolink-headers',
            // https://www.npmjs.com/package/gatsby-remark-autolink-headers#user-content-options
            options: {
              // icon: false,
              removeAccents: true,
              elements: ['h2', 'h3', 'h4', 'h5', 'h6'],
              isIconAfterHeader: true,
              // offsetY: `100`,
              // className: `custom-class`,
              // maintainCase: true,
            },
          },
          'gatsby-remark-prismjs',
        ],
      },
    },

    'gatsby-plugin-catch-links',
    'gatsby-plugin-transition-link',

    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Valentin Vago',
        short_name: 'Valentin Vago',
        start_url: '/',
        background_color: theme.backgroundColor,
        theme_color: theme.color,
        display: 'standalone',
        // This path is relative to the root of the site.
        icon: 'src/assets/zeropaper.svg',
        icons: appIcons,
      },
    },

    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // 'gatsby-plugin-offline',
  ],
};
