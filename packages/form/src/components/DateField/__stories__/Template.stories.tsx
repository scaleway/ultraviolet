import type { Story } from '@storybook/react'
import type { ComponentProps } from 'react'
import { DateField } from '..'

export const Template: Story<ComponentProps<typeof DateField>> = args => (
  <DateField {...args} />
)

Template.args = {
  name: 'template',
}
