import type { StoryFn } from '@storybook/react-vite'
import { Stack } from '../../Stack'
import { Text } from '../../Text'
import { child } from './styles.css'

export const Direction: StoryFn = props => (
  <Stack gap={3}>
    <Stack gap={1}>
      <Text as="p" variant="bodyStrong">
        Direction Row:
      </Text>
      <Stack {...props} direction="row" gap={1}>
        <div className={child} data-width-full>
          First child
        </div>
        <div className={child} data-width-full>
          Second child
        </div>
        <div className={child} data-width-full>
          Third child
        </div>
      </Stack>
    </Stack>
    <Stack gap={1}>
      <Text as="p" variant="bodyStrong">
        Direction Column:
      </Text>
      <Stack {...props} direction="column" gap={1}>
        <div className={child}>First child</div>
        <div className={child}>Second child</div>
        <div className={child}>Third child</div>
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
