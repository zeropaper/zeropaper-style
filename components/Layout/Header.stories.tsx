/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';

import Header from './Header';

export default {
  title: 'Layout/Header',
  component: Header,
  args: {},
  argTypes: {},
};

export const Base = (args) => (<Header {...args} />);
Base.args = {};
Base.argTypes = {};
