import React from 'react';
import { ComponentStory, ComponentMeta, DecoratorFn } from '@storybook/react';

import Layout from './Layout';

const PlaceHolder = (props: any) => <div className={props.className}>
  PlaceHolder
</div>

export default {
  title: 'Layout/Complete',
  component: Layout,
  args: {
    component: PlaceHolder,
    classes: {},
  },
  argTypes: {},
  parameters: {
    layout: 'fullscreen',
  }
} as ComponentMeta<typeof Layout>;

const Template: ComponentStory<typeof Layout> = (args) => <Layout {...args} />;

export const Base = Template.bind({});
Base.args = {};
Base.argTypes = {};


// eslint-disable-next-line storybook/prefer-pascal-case
export const withLayout: DecoratorFn = (Story) => (
  <Layout>
    <Story />
  </Layout>
)