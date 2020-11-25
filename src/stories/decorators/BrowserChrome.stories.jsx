/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import BrowserChrome from './BrowserChrome';

export default {
  title: 'utils/BrowserChrome',
  component: BrowserChrome,
  args: {
    children: 'Just some text',
  },
};

export const Basic = (args) => (<BrowserChrome {...args} />);
Basic.args = {};

export const ForLayout = () => (
  <BrowserChrome>
    Content
  </BrowserChrome>
);
