import { Meta, Story } from '@storybook/react'
import React, { ComponentProps } from 'react'
import ActionBar from '..'

export default {
  component: ActionBar,
  title: 'Components/ActionBar',
} as Meta

const Template: Story<ComponentProps<typeof ActionBar>> = args => (
  <ActionBar {...args}>I am an Action Bar</ActionBar>
)

export const Default = Template.bind({})

export const Ranks = Template.bind({})
Ranks.parameters = {
  docs: {
    story: {
      description:
        'You can choose the order of multiple `ActionBar` by using the `rank` prop.',
    },
  },
}
Ranks.decorators = [
  () => (
    <>
      <ActionBar rank={1}>I am an Action Bar with rank 1</ActionBar>
      <ActionBar rank={2}>I am an Action Bar with rank 2</ActionBar>
    </>
  ),
]
