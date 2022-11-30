import { ComponentStory } from '@storybook/react'
import StateBar from '..'

export const Unlimited: ComponentStory<typeof StateBar> = () => (
  <StateBar>
    <StateBar.State label="Unlimited" />
    <StateBar.Bar unlimited />
  </StateBar>
)

Unlimited.parameters = {
  docs: {
    storyDescription: 'Set unlimited using `unlimited` prop on `StateBar.Bar`.',
  },
}
