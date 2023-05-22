import type { StoryFn } from '@storybook/react'
import { ButtonV2 } from '..'

export const Template: StoryFn<typeof ButtonV2> = args => <ButtonV2 {...args} />

Template.args = {
  children: 'Click me',
  onClick: () => {},
}
