import type { ComponentStory } from '@storybook/react'
import { UnitInput } from '..'

export const Template: ComponentStory<typeof UnitInput> = args => (
  <UnitInput {...args} />
)

Template.args = {
  name: 'test',
}
