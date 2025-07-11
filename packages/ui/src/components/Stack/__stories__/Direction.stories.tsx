import type { StoryFn } from '@storybook/react'
import { Stack } from '../../Stack'
import { Text } from '../../Text'
import { DivWithBackground } from './DivWithBackground'

export const Direction: StoryFn = props => (
  <Stack gap={3}>
    <Stack gap={1}>
      <Text as="p" variant="bodyStrong">
        Direction Row:
      </Text>
      <Stack {...props} direction="row" gap={1}>
        <DivWithBackground data-width-full>First child</DivWithBackground>
        <DivWithBackground data-width-full>Second child</DivWithBackground>
        <DivWithBackground data-width-full>Third child</DivWithBackground>
      </Stack>
    </Stack>
    <Stack gap={1}>
      <Text as="p" variant="bodyStrong">
        Direction Column:
      </Text>
      <Stack {...props} direction="column" gap={1}>
        <DivWithBackground>First child</DivWithBackground>
        <DivWithBackground>Second child</DivWithBackground>
        <DivWithBackground>Third child</DivWithBackground>
      </Stack>
    </Stack>
  </Stack>
)

Direction.parameters = {
  docs: {
    description: {
      story:
        'prop `direction` allows the stack to behave as a column (default) or a row',
    },
  },
}
