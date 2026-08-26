import type { StoryFn } from '@storybook/react-vite'
import { Button } from '../../../action/Button'
import { Text } from '../../../typography/Text'
import { Stack } from '../../Stack'
import { Card } from '../index'

export const Disabled: StoryFn = args => (
  <Card {...args} disabled header="Disabled Card">
    <Stack gap={1}>
      <Text as="p" disabled sentiment="neutral" variant="body">
        This is a disabled card children.
      </Text>
      <Button disabled sentiment="neutral">
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
