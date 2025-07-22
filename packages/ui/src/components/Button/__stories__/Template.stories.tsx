import type { StoryFn } from '@storybook/react-vite'
import { Button } from '..'

export const Template: StoryFn<typeof Button> = args => <Button {...args} />

Template.args = {
  children: 'Click me',
}
