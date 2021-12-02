import { Meta, Story } from '@storybook/react'
import React, { ComponentProps } from 'react'
import Notice from '..'

export default {
  component: Notice,
  parameters: {
    docs: {
      description: {
        component: `Notice can be useful for small info messsages`,
      },
    },
  },
  title: 'Components/Data Display/Notice',
} as Meta

const Template: Story<ComponentProps<typeof Notice>> = args => (
  <Notice {...args}>This is a notice</Notice>
)

export const Default = Template.bind({})
