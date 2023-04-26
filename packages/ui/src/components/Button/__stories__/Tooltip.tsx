import type { ComponentStory } from '@storybook/react'
import { Button } from '..'

export const Tooltip: ComponentStory<typeof Button> = ({ ...props }) => (
  <>
    <Button
      action
      icon="lock"
      variant="primary"
      tooltip="I am locked"
      aria-label="test"
      {...props}
    />
    <Button
      icon="lock"
      variant="primary"
      tooltip="I am locked"
      aria-label="test"
      {...props}
    />
    <Button icon="lock" variant="primary" tooltip="I am locked" {...props}>
      Hover Me
    </Button>
  </>
)

Tooltip.parameters = {
  docs: {
    storyDescription: 'This show how to use `tooltip` on Button',
  },
}
