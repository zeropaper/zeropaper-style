/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import Toggle from './Toggle';

// import { ReactComponent as LightMode } from '../../assets/light-mode.svg';
// import { ReactComponent as DarkMode } from '../../assets/dark-mode.svg';

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
Basic.args = {
  checked: false,
};

export const ThemeMode = (args) => (<Basic {...args} />);
ThemeMode.args = {
  ...Basic.args,
};
