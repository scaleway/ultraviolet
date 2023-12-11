import type { StoryFn } from '@storybook/react'
import type { ComponentProps } from 'react'
import { ToggleField } from '..'

export const Template: StoryFn<ComponentProps<typeof ToggleField>> = args => (
  <ToggleField {...args} />
)

Template.args = {
  name: 'value',
}
