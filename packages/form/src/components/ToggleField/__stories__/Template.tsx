import type { Story } from '@storybook/react'
import type { ComponentProps } from 'react'
import { ToggleField } from '..'

export const Template: Story<ComponentProps<typeof ToggleField>> = args => (
  <ToggleField {...args} />
)

Template.args = {
  name: 'template',
}
