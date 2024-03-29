/** @type {import('next').NextConfig} */
const config = {
  webpack(config) {
    config.module.rules.push({
      test: /\.(yml|yaml)$/,
      use: 'yaml-loader',
    });

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
      {
        source: '/admin',
        destination: '/admin/index.html',
        permanent: true,
      },
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

module.exports = config;
