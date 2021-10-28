import { Meta, Story } from '@storybook/react'
import React from 'react'
import PasswordCheck, { PasswordCheckProps } from '..'

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

const Template: Story<PasswordCheckProps> = args => (
  <PasswordCheck {...args} rules={[]}>
    Button
  </PasswordCheck>
)

export const Default = Template.bind({})

export const Rules = Template.bind({})
Rules.decorators = [
  () => (
    <PasswordCheck
      rules={[
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
      ]}
    >
      Button
    </PasswordCheck>
  ),
]
