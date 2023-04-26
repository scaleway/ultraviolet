import type { Story } from '@storybook/react'
import type { ComponentProps } from 'react'
import { TextInputField } from '..'

export const Template: Story<ComponentProps<typeof TextInputField>> = args => (
  <TextInputField {...args} />
)

Template.args = {
  name: 'template',
}
