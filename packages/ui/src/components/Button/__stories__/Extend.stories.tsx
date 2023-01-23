import type { ComponentStory } from '@storybook/react'
import { Button } from '..'
import { Stack } from '../../Stack'

export const Extend: ComponentStory<typeof Button> = ({ ...props }) => (
  <Stack gap={1} style={{ width: '100%' }}>
    <Stack gap={1} alignItems="start">
      <Button icon="plus" extend iconSize={24} {...props}>
        Normal Button
      </Button>
    </Stack>
    <Stack gap={1} alignItems="center">
      <Button icon="plus" extend iconSize={24} {...props}>
        Normal Button
      </Button>
    </Stack>
    <Stack gap={1} alignItems="end">
      <Button icon="plus" extend iconSize={24} {...props}>
        Normal Button
      </Button>
    </Stack>
  </Stack>
)

Extend.parameters = {
  docs: {
    storyDescription:
      'This shows how to make button extensible using `extend` on Button. ⚠️ It requires an `icon`.',
  },
}
