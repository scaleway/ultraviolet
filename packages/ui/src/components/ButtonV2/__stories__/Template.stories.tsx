import type { ComponentStory } from '@storybook/react'
import { ButtonV2 } from '..'

export const Template: ComponentStory<typeof ButtonV2> = args => (
  <ButtonV2 {...args} />
)

Template.args = {
  children: 'Click me',
  onClick: () => {},
}
