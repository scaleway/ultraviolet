import { Label } from '..'

import type { StoryFn } from '@storybook/react-vite'

export const Template: StoryFn<typeof Label> = props => <Label {...props} />

Template.args = {
  children: 'Label',
}
