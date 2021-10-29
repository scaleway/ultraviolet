import { Meta, Story } from '@storybook/react'
import React from 'react'
import Dot, { DotProps } from '..'

export default {
  component: Dot,
  title: 'Components/Data Display/Dot',
} as Meta

const Template: Story<DotProps> = args => <Dot {...args} />

export const Default = Template.bind({})

export const Color = Template.bind({})
Color.parameters = {
  docs: {
    storyDescription: 'Customize the style of the dot with `color` prop.',
  },
}
Color.decorators = [
  () => (
    <>
      <Dot color="primary" mr={1} />
      <Dot color="success" mr={1} />
      <Dot color="warning" mr={1} />
      <Dot color="info" mr={1} />
    </>
  ),
]
