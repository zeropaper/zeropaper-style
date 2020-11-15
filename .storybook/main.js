const { join } = require('path');

const srcDir = join(__dirname, '..', 'src');

module.exports = {
  stories: [
    '../src/**/*.stories.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
  ],
  webpackFinal: async (config) => {
    const svgRule = config.module.rules.find((rule) => 'test.svg'.match(rule.test));
    svgRule.exclude = [srcDir];

    config.module.rules.push({
      test: /\.svg$/i,
      include: [srcDir],
      use: [{
        loader: '@svgr/webpack',
      }, 'file-loader'],
    });

    return config;
  },
};
