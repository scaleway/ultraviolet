import type { StoryFn } from '@storybook/react'
import { Button } from '../../Button'
import { Stack } from '../../Stack'
import { Text } from '../../Text'
import { Card } from '../index'

export const Disabled: StoryFn = args => (
  <Card {...args} header="Disabled Card" disabled>
    <Stack gap={1}>
      <Text as="p" variant="body" disabled sentiment="neutral">
        This is a disabled card children.
      </Text>
      <Button sentiment="neutral" disabled>
        Button
      </Button>
    </Stack>
  </Card>
)

Disabled.parameters = {
  docs: {
    description: {
      story: 'You can disable a Card by passing the `disabled` prop.',
    },
  },
}
