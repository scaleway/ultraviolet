import { Button } from '..'

import type { StoryFn } from '@storybook/react-vite'

export const Template: StoryFn<typeof Button> = args => <Button {...args} />

Template.args = {
  children: 'Click me',
}
