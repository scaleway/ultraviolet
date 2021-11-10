import { Meta, Story } from '@storybook/react'
import React from 'react'
import Tags, { TagsProps } from '..'

export default {
  args: {
    name: 'default',
    onChange: (tags: string[]) => console.log(tags),
    tags: ['default'],
    variant: 'base',
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
    disabled: {
      control: { type: 'boolean' },
      defaultValue: false,
      description: 'disabled',
      name: 'disabled',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
      type: { name: 'boolean' },
    },
    manualInput: {
      control: { type: 'boolean' },
      defaultValue: true,
      description: 'if false you have to control your values by yourself',
      name: 'manualInput',
      table: {
        defaultValue: { summary: true },
        type: { summary: 'boolean' },
      },
      type: { name: 'boolean' },
    },
    placeholder: {
      defaultValue: 'placeholder',
      name: 'placeholder',
      table: {
        defaultValue: { summary: 'placeholder' },
        type: { summary: 'string' },
      },
      type: { name: 'string' },
    },
    tags: {
      description:
        'your tags value could be an array of string `["tags","default"]` or an array object `[{label: "test", value: "toto"}]`',
      name: 'tags',
      table: {
        type: { summary: 'array' },
      },
      type: { name: 'array' },
    },
    variant: {
      description: `you have the possibility between "base | bordered | no-border "`,
      name: 'variant',
      options: ['base', 'bordered', 'no-border'],
      table: {
        defaultValue: { summary: 'base' },
        type: { summary: 'select' },
      },
    },
  },

  component: Tags,
  parameters: {
    docs: {
      description: {
        component: 'Text input with multiple tag component in a row.',
      },
    },
  },
  title: 'Components/Data Display/Tags',
} as Meta

const Template: Story<TagsProps> = args => <Tags {...args} />

export const Default = Template.bind({})
