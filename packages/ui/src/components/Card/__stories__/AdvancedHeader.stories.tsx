import type { StoryFn } from '@storybook/react-vite'
import { Alert } from '../../Alert'
import { Badge } from '../../Badge'
import { Stack } from '../../Stack'
import { Text } from '../../Text'
import { Card } from '../index'

export const AdvancedHeader: StoryFn = args => {
  const CustomHeader = (
    <Stack gap={1}>
      <Stack gap={1} direction="row" alignItems="center">
        <Text variant="heading" as="h4" sentiment="neutral" prominence="strong">
          Advanced Header
        </Text>
        <Badge sentiment="success" size="small">
          New
        </Badge>
      </Stack>
      <Alert sentiment="info">This is an info alert in the header</Alert>
    </Stack>
  )

  return (
    <Card {...args} header={CustomHeader}>
      This is the content of a Card
    </Card>
  )
}

AdvancedHeader.parameters = {
  docs: {
    description: {
      story:
        'Header can be a `string` but also a component if you need more complex header. Keep in mind that when you\'re using a custom component you need to use `<Text variant="heading" as="h2">` to be consistent with non-custom Card headers.',
    },
  },
}
