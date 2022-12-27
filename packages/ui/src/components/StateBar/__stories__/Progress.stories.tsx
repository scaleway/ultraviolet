import type { ComponentStory } from '@storybook/react'
import StateBar from '..'

export const Progress: ComponentStory<typeof StateBar> = () => (
  <StateBar>
    <StateBar.State label="Progress" />
    <StateBar.Bar unlimited />
  </StateBar>
)

Progress.parameters = {
  docs: {
    storyDescription: 'Set progress using `progress` prop on `StateBar.Bar`.',
  },
}
