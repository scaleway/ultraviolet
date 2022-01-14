import { Meta, Story } from '@storybook/react'
import { ComponentProps } from 'react'
import Tag from '..'

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

const Template: Story<ComponentProps<typeof Tag>> = args => <Tag {...args} />

export const Default = Template.bind({})
