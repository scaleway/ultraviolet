import type { ComponentStory } from '@storybook/react'
import { Button } from '..'

export const Tooltip: ComponentStory<typeof Button> = () => (
  <div style={{ display: 'flex' }}>
    <Button onClick={() => {}} tooltip="Tooltip text">
      Click me
    </Button>
  </div>
)

Tooltip.parameters = {
  docs: {
    storyDescription:
      'You can add a prop "tooltip" which wrap the Button inside a Tooltip component, the optional ref will be applied to the button. For more advanced tooltip usage, we recommand to wrap manually the Button using the Tooltip component.',
  },
}
