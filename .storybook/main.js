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
    const newConfig = { ...config };
    const svgRule = newConfig.module.rules.find((rule) => 'test.svg'.match(rule.test));
    svgRule.exclude = [srcDir];

    newConfig.module.rules.push({
      test: /\.svg$/i,
      include: [srcDir],
      use: [{
        loader: '@svgr/webpack',
      }, 'file-loader'],
    });

    newConfig.resolve.alias['gatsby-plugin-transition-link'] = require.resolve('gatsby-link');

    return newConfig;
  },
};
