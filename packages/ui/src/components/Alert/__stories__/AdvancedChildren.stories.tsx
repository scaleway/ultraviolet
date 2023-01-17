import { Alert } from '..'
import { Button } from '../../Button'
import { Stack } from '../../Stack'
import { Text } from '../../Text'

export const AdvancedChildren = () => (
  <Alert>
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Text variant="body" as="p" color="danger">
        I am a complex children
      </Text>
      <Button variant="warning">With a button</Button>
    </Stack>
  </Alert>
)

AdvancedChildren.parameters = {
  docs: {
    storyDescription:
      'If you want to add more information into your alert you can simply pass it to Alert component as children.',
  },
}
