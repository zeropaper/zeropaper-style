import React from 'react';
import { Box } from '@mantine/core';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Layout from './Layout';

const PlaceHolder = ({
  text,
  minHeight
}: {
  minHeight?: string,
  text: string
}) => <Box sx={() => ({
  minHeight: minHeight || 'auto',
  backgroundColor: 'lightgrey',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})}>
    {text}
  </Box>

export default {
  title: 'Layout/Complete',
  component: Layout,
  args: {
    children: <PlaceHolder text='Simple' />,
  },
  argTypes: {},
  parameters: {
    layout: 'fullscreen',
  }
} as ComponentMeta<typeof Layout>;

const Template: ComponentStory<typeof Layout> = (args) => <Layout {...args} />;

export const Base = Template.bind({});
Base.args = {
  children: <PlaceHolder text='Placeholder' />,
};
Base.argTypes = {};

export const LongContent = Template.bind({});
LongContent.args = {
  children: <PlaceHolder minHeight='400vh' text='Placeholder' />,
};
LongContent.argTypes = {};
