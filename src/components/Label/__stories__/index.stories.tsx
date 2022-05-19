import { Meta, Story } from '@storybook/react'
import { ComponentProps } from 'react'
import Label from '..'

export default {
  component: Label,
  title: 'Components/Data Entry/Label',
} as Meta

const Template: Story<ComponentProps<typeof Label>> = args => (
  <Label {...args}>This is a label</Label>
)

export const Default = Template.bind({})
