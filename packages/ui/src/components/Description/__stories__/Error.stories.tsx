import type { StoryFn } from '@storybook/react-vite'
import { Description } from '..'
import { Stack } from '../../Stack'
import { Text } from '../../Text'

export const Error: StoryFn<typeof Description> = props => (
  <Stack direction="column" alignItems="baseline" gap={1}>
    <Text as="span" variant="body">
      With prop error as a string:
    </Text>
    <Description {...props} error="Error" />

    <Text as="span" variant="body">
      With prop error as a boolean (true):
    </Text>
    <Description {...props} error />
  </Stack>
)

Error.args = {
  helper: 'This is helper text',
}
