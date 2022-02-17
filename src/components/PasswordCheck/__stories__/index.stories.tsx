import { Meta, Story } from '@storybook/react'
import React, { ComponentProps } from 'react'
import PasswordCheck from '..'

export default {
  component: PasswordCheck,
  parameters: {
    docs: {
      description: {
        component:
          'Password checker shows what is missing into password to validate requirements.',
      },
    },
  },
  title: 'Components/Data Entry/PasswordCheck',
} as Meta

const Template: Story<ComponentProps<typeof PasswordCheck>> = args => (
  <PasswordCheck {...args}>Button</PasswordCheck>
)

export const Default = Template.bind({})
Default.args = {
  rules: [
    {
      name: 'hasOneUppercase',
      text: 'Password must have at least one uppercase character',
      valid: true,
    },
    {
      name: 'hasOneLowercase',
      text: 'Password must have at least one lowercase character',
      valid: true,
    },
    {
      name: 'hasOneSpecial',
      text: 'Password must have at least one special character',
      valid: true,
    },
    {
      name: 'hasOneNumber',
      text: 'Password must have at least one number',
      valid: true,
    },
    {
      name: 'isLongEnough',
      text: 'Password must have a minimum of 8 characters',
      valid: false,
    },
    {
      name: 'score',
      text: 'Password strength score',
      valid: false,
    },
  ],
}
