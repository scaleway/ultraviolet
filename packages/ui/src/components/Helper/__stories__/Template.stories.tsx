import { Helper } from '..'

import type { StoryFn } from '@storybook/react-vite'

export const Template: StoryFn<typeof Helper> = props => <Helper {...props} />

Template.args = {
  helper: 'This is helper text',
}
