const theme = require('./src/themes/data');

module.exports = {
  siteMetadata: {
    title: 'Valentin Vago',
    description: 'Personal web page of Valentin Vago aka zeropaper.',
    author: 'Valentin "zeropaper" Vago',
  },
  plugins: [
    'gatsby-plugin-better-jss',
    'gatsby-plugin-react-helmet',

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
          // 'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
          // 'gatsby-remark-autolink-headers',
        ],
      },
    },

    'gatsby-plugin-catch-links',

    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Valentin Vago',
        short_name: 'Valentin Vago',
        start_url: '/',
        background_color: theme.backgroundColor,
        theme_color: theme.color,
        display: 'minimal-ui',
        // This path is relative to the root of the site.
        icon: 'src/assets/images/zeropaper-fat.svg',
      },
    },

    // // this (optional) plugin enables Progressive Web App + Offline functionality
    // // To learn more, visit: https://gatsby.dev/offline
    // 'gatsby-plugin-offline',
  ],
};
