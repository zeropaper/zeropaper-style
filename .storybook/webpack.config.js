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
        test: new RegExp(testStr.split('|svg').join('').split('svg|').join('')),
      };
    }
  });
  config.module.rules.unshift({
    test: /\.svg$/,
    use: [svgr],
  });
  config.module.rules.push({
    test: /\.(yml|yaml)$/,
    use: 'yaml-loader',
  });
  return config;
};
