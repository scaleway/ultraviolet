import { Meta, Story } from '@storybook/react'
import React from 'react'
import Boxer from '..'

export default {
  component: Boxer,
  title: 'Components/Container/Boxer',
} as Meta

const Template: Story<Record<string, never>> = args => <Boxer {...args}>
  <div>Children 1 - I&apos;m in a box component</div>
  <span>Children 2 - I&apos;m in a box component too</span>
</Boxer>

export const Default = Template.bind({})

Default.parameters = {
  docs: {
    storyDescription: 'Wraps its children into `Box` component.',
  },
}
