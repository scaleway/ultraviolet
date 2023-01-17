import type { ComponentStory } from '@storybook/react'
import { Button } from '..'

export const Action: ComponentStory<typeof Button> = ({ ...props }) => (
  <>
    <Button action icon="rocket" aria-label="test" {...props} />
    <Button
      action
      icon="rocket"
      variant="success"
      aria-label="test"
      {...props}
    />
    <Button
      action="rounded"
      icon="rocket"
      variant="warning-bordered"
      aria-label="test"
      {...props}
    />
  </>
)

Action.parameters = {
  docs: {
    storyDescription:
      'This shows how to use `action`prop on Button. ⚠️ The Button should not have a children.',
  },
}
Action.decorators = [
  StoryComponent => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
      <StoryComponent />
    </div>
  ),
]
