import type { StoryFn } from '@storybook/react-vite'
import { theme } from '@ultraviolet/themes'
import { Button } from '../../../../Action/Button'
import { Stack } from '../../../../Layout/Stack'
import { Text } from '../../../../Typography/Text'
import { Popup } from '../index'

const PLACEMENTS = ['top', 'right', 'bottom', 'left'] as const

export const Arrow: StoryFn<typeof Popup> = () => (
  <>
    {PLACEMENTS.map(placement => (
      <Popup.Root key={placement}>
        <Popup.Trigger>
          <Button sentiment="neutral" variant="outlined" size="small">
            arrow {placement}
          </Button>
        </Popup.Trigger>
        <Popup.Panel arrow placement={placement}>
          <Stack gap={1} style={{ padding: theme.space['2'] }}>
            <Text as="p" variant="bodySmall">
              Popup with arrow pointing at its trigger.
            </Text>
          </Stack>
        </Popup.Panel>
      </Popup.Root>
    ))}
  </>
)

Arrow.decorators = [
  StoryComponent => (
    <Stack alignItems="center" gap={2} justifyContent="center" style={{ margin: '2rem 1rem 1rem' }}>
      <StoryComponent />
    </Stack>
  ),
]
