import { Meta, Story } from '@storybook/react'
import React from 'react'
import Tag, { TagProps } from '..'

export default {
  args: {
    children: 'default',
  },
  argTypes: {
    children: {
      defaultValue: 'This is a children',
      name: 'children',
      table: {
        defaultValue: { summary: 'This is a children' },
        type: { required: true, summary: 'string' },
      },
      type: { name: 'string', required: true },
    },
  },
  component: Tag,
  parameters: {
    docs: {
      description: {
        component: 'Compact element to display information inside a box.',
      },
    },
  },
  title: 'Components/Data Display/Tag',
} as Meta

const Template: Story<TagProps> = args => <Tag {...args} />


export const Default = Template.bind({})


