/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Logo from './Logo';

export default {
  title: 'Logo',
  component: Logo,
  args: {},
  argTypes: {
    className: { control: { disable: true } },
  },
};

export const Slim = (args) => (<Logo {...args} />);
Slim.args = { slim: true };

export const Fat = (args) => (<Logo {...args} />);
Fat.args = {};
