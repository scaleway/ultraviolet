import type { StoryFn } from '@storybook/react-vite'
import { Stack } from '../../Stack'
import { Text } from '../../Text'
import { styledDiv } from './DivWithBackground.css'

export const Direction: StoryFn = props => (
  <Stack gap={3}>
    <Stack gap={1}>
      <Text as="p" variant="bodyStrong">
        Direction Row:
      </Text>
      <Stack {...props} direction="row" gap={1}>
        <div className={styledDiv} data-width-full>
          First child
        </div>
        <div className={styledDiv} data-width-full>
          Second child
        </div>
        <div className={styledDiv} data-width-full>
          Third child
        </div>
      </Stack>
    </Stack>
    <Stack gap={1}>
      <Text as="p" variant="bodyStrong">
        Direction Column:
      </Text>
      <Stack {...props} direction="column" gap={1}>
        <div className={styledDiv}>First child</div>
        <div className={styledDiv}>Second child</div>
        <div className={styledDiv}>Third child</div>
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
