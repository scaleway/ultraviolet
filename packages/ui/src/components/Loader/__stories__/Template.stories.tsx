import type { StoryFn } from '@storybook/react-vite'
import { Loader } from '../index'

export const Template: StoryFn<typeof Loader> = props => <Loader {...props} />

Template.args = {
  label: 'Loading example',
}
