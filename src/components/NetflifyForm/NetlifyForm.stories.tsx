/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { NetlifyForm } from './NetlifyForm';

export default {
  title: 'Example/NetlifyForm',
  component: NetlifyForm,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

const Template = (args) => <NetlifyForm {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: 'NetlifyForm',
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'NetlifyForm',
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  label: 'NetlifyForm',
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  label: 'NetlifyForm',
};
