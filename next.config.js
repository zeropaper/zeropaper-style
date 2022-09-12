/** @type {import('next').NextConfig} */
module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            // use prettier to format JS code output (default: true)
            prettier: false,
            // use svgo to optimize SVGs (default: true)
            // dimensions: false,
            // removeDimensions: false,
            svgo: false,
            svgoConfig: {
              // remove viewBox when possible (default: true)
              removeViewBox: false,
              // remove unused IDs and minify remaining IDs (default: true)
              cleanupIDs: true,
            },
          },
        },
      ],
    });

    return config;
  },
  async redirects() {
    return [
      // {
      //   source: '/',
      //   destination: '/docs/getting-started',
      //   permanent: false
      // },
      // {
      //   source: '/docs/',
      //   destination: '/docs/getting-started',
      //   permanent: false
      // },
    ];
  },
  rewrites: async () => {
    return [
      {
        source: '/sb/:path*',
        destination: '/sb/index.html',
      },
    ];
  },
  trailingSlash: true,
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx'],
};
