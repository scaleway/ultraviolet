import { ToggleField } from '..'

import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'

export const Template: StoryFn<ComponentProps<typeof ToggleField>> = args => (
  <ToggleField {...args} />
)

Template.args = {
  name: 'value',
}
