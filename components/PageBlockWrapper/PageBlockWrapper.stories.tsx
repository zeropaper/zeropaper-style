import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { withLayout } from '../Layout/Layout.stories';
import { useStyles } from '../Layout/Layout';
import Wrapper from './PageBlockWrapper'
import { useTheme } from '../../themes/Theme';

export default {
  title: 'Atoms/PageBlockWrapper',
  component: Wrapper,
  decorators: [withLayout],
  parameters: {
    layout: 'fullscreen'
  },
  argTypes: {
    children: { table: { disable: true } }
  },
  args: {
    slant: true,
    children: `In publishing and graphic design, Lorem ipsum is a placeholder text
        commonly used to demonstrate the visual form of a document or a typeface
        without relying on meaningful content. Lorem ipsum may be used as a
        placeholder before the final copy is available.`
  }
} as ComponentMeta<typeof Wrapper>

const BaseTemplate: ComponentStory<typeof Wrapper> = (args) => (
  <Wrapper {...args} />
)
export const Base = BaseTemplate.bind({})
Base.args = {}

const BackgroundTemplate: ComponentStory<typeof Wrapper> = (args) => {
  const { classes } = useStyles()
  const { colors } = useTheme()
  return (
    <div className={classes.main}>
      <Wrapper {...args}>
        No background
        <hr />
        {args.children}
      </Wrapper>

      {Object.keys(colors).map(key => (
        <Wrapper {...args} background={key} key={key}>
          {`${key} background`}
          <hr />
          {args.children}
        </Wrapper>
      ))}
    </div>
  )
}
export const Background = BackgroundTemplate.bind({})
Background.args = {}
