import type { Story } from '@storybook/react'
import { Button } from '../../Button'
import { Stack } from '../../Stack'
import { Text } from '../../Text'
import { Card } from '../index'

export const Disabled: Story = () => (
  <Card header="Disabled Card" disabled>
    <Stack gap={1}>
      <Text as="p" variant="body" disabled>
        We are using the disabled state returned from Card to disable its
        children
      </Text>
      <Button disabled>Button</Button>
    </Stack>
  </Card>
)

Disabled.parameters = {
  docs: {
    storyDescription:
      'You can disable a Card by passing the `disabled` prop. It will disable the Card and you can use the `disabled` state returned from Card to disable its children.',
  },
}
