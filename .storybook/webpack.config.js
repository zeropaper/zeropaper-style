const path = require('path');

const svgr = {
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
};

module.exports = ({ config }) => {
  config.module.rules.forEach((rule, r) => {
    const testStr = rule.test.toString();
    if (testStr.includes('svg')) {
      config.module.rules[r] = {
        ...rule,
        test: new RegExp(testStr.replaceAll('|svg', '').replaceAll('svg|', '')),
      };
    }
  });
  config.module.rules.unshift({
    test: /\.svg$/,
    use: [svgr],
  });
  return config;
};
