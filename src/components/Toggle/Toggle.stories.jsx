/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import Toggle from './Toggle';

export default {
  component: Toggle,
  title: 'Toggle',
  args: {
    checked: false,
  },
  argTypes: {
    classes: { control: { disable: true } },
    // onChange: { control: { disable: true } },
  },
};

export const Basic = (args) => (<Toggle {...args} />);
