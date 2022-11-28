import { ComponentStory } from '@storybook/react'
import Button from '..'

export const Tooltip: ComponentStory<typeof Button> = () => (
  <>
    <Button
      action
      icon="lock"
      variant="primary"
      tooltip="I am locked"
      aria-label="test"
    />
    <Button
      icon="lock"
      variant="primary"
      tooltip="I am locked"
      aria-label="test"
    />
    <Button icon="lock" variant="primary" tooltip="I am locked">
      Hover Me
    </Button>
  </>
)

Tooltip.parameters = {
  docs: {
    storyDescription: 'This show how to use `tooltip` on Button',
  },
}
