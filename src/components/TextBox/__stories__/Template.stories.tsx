import { ComponentStory } from '@storybook/react'
import UncontrolledTextBox from './UncontrolledTextBox'

export const Template: ComponentStory<typeof UncontrolledTextBox> = args => (
  <UncontrolledTextBox {...args} />
)
