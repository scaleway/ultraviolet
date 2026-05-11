import type { StoryFn } from '@storybook/react-vite'
import { Label } from '..'

export const Template: StoryFn<typeof Label> = props => <Label {...props} />

Template.args = {
  children: 'Label',
}
