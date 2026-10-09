import type { StoryFn } from '@storybook/react-vite'
import { Button } from '../../../../Action/Button'
import { Stack } from '../../../../Layout/Stack'
import { Text } from '../../../../Typography/Text'
import { PopupV2 } from '../index'

const PLACEMENTS = ['top', 'right', 'bottom', 'left'] as const

export const Arrow: StoryFn<typeof PopupV2> = () => (
  <>
    {PLACEMENTS.map(placement => (
      <PopupV2.Root key={placement}>
        <PopupV2.Trigger>
          <Button sentiment="neutral" variant="outlined" size="small">
            arrow {placement}
          </Button>
        </PopupV2.Trigger>
        <PopupV2.Panel arrow placement={placement}>
          <Stack gap={1}>
            <Text as="p" variant="bodySmall">
              Popup with arrow pointing at its trigger.
            </Text>
          </Stack>
        </PopupV2.Panel>
      </PopupV2.Root>
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
