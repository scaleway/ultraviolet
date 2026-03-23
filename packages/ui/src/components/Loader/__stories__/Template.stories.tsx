import { Loader } from '../index'

import type { StoryFn } from '@storybook/react-vite'

export const Template: StoryFn<typeof Loader> = props => <Loader {...props} />

Template.args = {
  label: 'Loading example',
}
