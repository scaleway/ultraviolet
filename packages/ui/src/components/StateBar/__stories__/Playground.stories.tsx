import type { ComponentStory } from '@storybook/react'
import { StateBar } from '..'

export const Playground: ComponentStory<typeof StateBar> = ({ ...props }) => (
  <StateBar {...props}>
    <StateBar.State label="Label">your value</StateBar.State>
    <StateBar.Bar value={50} />
  </StateBar>
)
