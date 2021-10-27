import { Meta, Story } from '@storybook/react'
import React from 'react'
import Notice, { NoticeProps } from '..'

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

const Template: Story<NoticeProps> = args => (
  <Notice {...args}>This is a notice</Notice>
)

export const Default = Template.bind({})
