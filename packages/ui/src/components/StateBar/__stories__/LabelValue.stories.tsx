import type { ComponentStory } from '@storybook/react'
import StateBar from '..'

export const LabelValue: ComponentStory<typeof StateBar> = () => (
  <StateBar>
    <StateBar.State label="Percent">70%</StateBar.State>
    <StateBar.Bar value={70} />
  </StateBar>
)

LabelValue.parameters = {
  docs: {
    storyDescription:
      'You can set a value setting a children to the StateBar.State',
  },
}
