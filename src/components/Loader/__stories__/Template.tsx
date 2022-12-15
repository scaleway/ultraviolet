import type { ComponentStory } from '@storybook/react'
import Loader from '../index'

export const Template: ComponentStory<typeof Loader> = props => (
  <Loader {...props} />
)

Template.args = {
  label: 'Loading example',
}
