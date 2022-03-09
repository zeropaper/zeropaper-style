import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import IFrame from './Iframe';
import { withLayout } from '../Layout/Layout.stories';
import type { TinaMarkdownContent } from 'tinacms/dist/rich-text';

const exampleMdx: TinaMarkdownContent | TinaMarkdownContent[] = {
  "type": "root",
  "children": [
    {
      "type": "p",
      "children": [
        {
          "type": "text",
          "text": "I'm learning TypeScript like I learned everything: 1 stupid idea at a time."
        }
      ]
    }
  ]
} as any

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Stuff/IFrame',
  component: IFrame,
  decorators: [withLayout],
  parameters: {
    layout: 'fullscreen',
  },
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // argTypes: {
  //   backgroundColor: { control: 'color' },
  // },
} as ComponentMeta<typeof IFrame>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof IFrame> = (args) => <IFrame {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  iframe: 'https://www.youtube-nocookie.com/embed/a36y_8bSPus',
  description: 'A description of the video',
  title: 'Some title',
  mdx: exampleMdx
};

export const Secondary = Template.bind({});
Secondary.args = {
  ...Primary.args,
  iframe: 'https://zeropaper.github.io/',
};

export const Large = Template.bind({});
Large.args = {
};

export const Small = Template.bind({});
Small.args = {
};
