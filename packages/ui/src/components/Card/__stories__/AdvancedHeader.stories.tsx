import type { Story } from '@storybook/react'
import { Alert } from '../../Alert'
import { Badge } from '../../Badge'
import { Stack } from '../../Stack'
import { Text } from '../../Text'
import { Card } from '../index'

export const AdvancedHeader: Story = () => {
  const CustomHeader = (
    <Stack gap={1}>
      <Stack gap={1} direction="row" alignItems="center">
        <Text variant="heading" as="h2">
          Advanced Header
        </Text>
        <Badge variant="success" size="small">
          New
        </Badge>
      </Stack>
      <Alert variant="info">This is an info alert in the header</Alert>
    </Stack>
  )

  return <Card header={CustomHeader}>This is the content of a Card</Card>
}

AdvancedHeader.parameters = {
  docs: {
    storyDescription:
      'Header can be a `string` but also a component if you need more complex header. Keep in mind that when you\'re using a custom component you need to use `<Text variant="heading" as="h2">` to be consistent with non-custom Card headers.',
  },
}
