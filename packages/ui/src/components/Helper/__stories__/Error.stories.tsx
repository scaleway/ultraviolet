import { Helper } from '..'
import { Stack } from '../../Stack'
import { Text } from '../../Text'

import type { StoryFn } from '@storybook/react-vite'

export const Error: StoryFn<typeof Helper> = props => (
  <Stack direction="column" alignItems="baseline" gap={1}>
    <Text as="span" variant="body">
      With prop error as a string:
    </Text>
    <Helper {...props} error="Error" />

    <Text as="span" variant="body">
      With prop error as a boolean (true):
    </Text>
    <Helper {...props} error />
  </Stack>
)

Error.args = {
  helper: 'This is helper text',
}
