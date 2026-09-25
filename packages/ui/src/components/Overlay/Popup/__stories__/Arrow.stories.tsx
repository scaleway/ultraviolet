import type { StoryFn } from '@storybook/react-vite'
import { Button } from '../../../Action/Button'
import { Stack } from '../../../Layout/Stack'
import { Text } from '../../../Typography/Text'
import { Popup } from '../index'
import { Panel } from './Panel'

export const Arrow: StoryFn<typeof Popup> = () => (
  <Stack gap={5} width="100%">
    <Stack gap={1}>
      <Text as="code" variant="bodyStrong">
        {`hasArrow={true} (default):`}
      </Text>
      <Popup debounceDelay={0} hasArrow text={<Panel title="With arrow" />}>
        <Button sentiment="neutral" variant="outlined">
          Hover me
        </Button>
      </Popup>
    </Stack>

    <Stack gap={1}>
      <Text as="p" variant="bodyStrong">
        {`hasArrow={false}:`}
      </Text>
      <Popup debounceDelay={0} hasArrow={false} text={<Panel title="Without arrow" />}>
        <Button sentiment="neutral" variant="outlined">
          Hover me
        </Button>
      </Popup>
    </Stack>
  </Stack>
)

Arrow.parameters = {
  docs: {
    description: {
      story:
        'In the current API the arrow is toggled with the `hasArrow` boolean prop, and its position is computed inside `helpers.ts`. The planned API replaces this with an opt-in `Popup.Arrow` subcomponent — consumers render it or not — with the position provided by the `arrow()` middleware of `@floating-ui/react`.',
    },
  },
}
