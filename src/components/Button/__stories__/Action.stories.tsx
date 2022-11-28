import { ComponentStory } from '@storybook/react'
import Button from '..'

export const Action: ComponentStory<typeof Button> = () => (
  <>
    <Button action icon="rocket" aria-label="test" />
    <Button action icon="rocket" variant="success" aria-label="test" />
    <Button
      action="rounded"
      icon="rocket"
      variant="warning-bordered"
      aria-label="test"
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
