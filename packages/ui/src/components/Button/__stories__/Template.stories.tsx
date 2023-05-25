import type { ComponentStory } from '@storybook/react'
import { Button } from '..'

export const Template: ComponentStory<typeof Button> = args => (
  <Button {...args} />
)

Template.args = {
  children: 'Click me',
  onClick: () => {},
}
