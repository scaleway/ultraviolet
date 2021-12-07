import { Meta, Story } from '@storybook/react'
import React, { ComponentProps } from 'react'
import BulletList from '..'

export default {
  component: BulletList,
  parameters: {
    docs: {
      description: {
        component: 'Make a list with sub components in it.',
      },
    },
  },
  title: 'Components/Data Display/BulletList',
} as Meta

const Template: Story<ComponentProps<typeof BulletList>> = args => (
  <BulletList {...args} />
)

export const Default = Template.bind({})

Default.args = {
  ...Template.args,
  children: 'First',
}

export const Showcase = Template.bind({})

Showcase.args = {
  ...Template.args,
  children: [<div>First</div>, <div>Second</div>, <div>Third</div>],
}
