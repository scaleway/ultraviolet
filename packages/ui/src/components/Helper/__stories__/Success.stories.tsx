import { Helper } from '..'
import { Stack } from '../../Stack'
import { Text } from '../../Text'

import type { StoryFn } from '@storybook/react-vite'

export const Success: StoryFn<typeof Helper> = props => (
  <Stack direction="column" alignItems="baseline" gap={1}>
    <Text as="span" variant="body">
      With prop success as a string
    </Text>
    <Helper {...props} success="Success" />
    <Text as="span" variant="body">
      With prop success as a boolean (true)
    </Text>
    <Helper {...props} success />
  </Stack>
)

Success.args = {
  helper: 'This is helper text',
}
