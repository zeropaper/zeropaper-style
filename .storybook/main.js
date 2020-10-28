const path = require('path');

module.exports = {
  stories: [
    `../src/components/**/*.stories.jsx`,
    `../stories/**/*.stories.jsx`,
    // '../stories/**/*.stories.jsx'
  ],
  addons: [
    '@storybook/addon-essentials',
  ],
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Return the altered config
    return config;
  },
};
console.info(module.exports.stories);