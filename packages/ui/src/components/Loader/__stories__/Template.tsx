import type { StoryFn } from '@storybook/react'
import { Loader } from '../index'

export const Template: StoryFn<typeof Loader> = props => <Loader {...props} />

Template.args = {
  label: 'Loading example',
}
