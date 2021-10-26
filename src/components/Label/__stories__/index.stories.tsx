import { Meta, Story } from '@storybook/react'
import React from 'react'
import Label, { LabelProps } from '..'

export default {
  component: Label,
  title: 'Components/Data Entry/Label',
} as Meta

const Template: Story<LabelProps> = args => (
  <Label {...args}>This is a label</Label>
)

export const Default = Template.bind({})
