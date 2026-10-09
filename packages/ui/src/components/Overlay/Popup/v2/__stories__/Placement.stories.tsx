import type { StoryFn } from '@storybook/react-vite'
import { Button } from '../../../../Action/Button'
import { Stack } from '../../../../Layout/Stack'
import { Text } from '../../../../Typography/Text'
import { PopupV2 } from '../index'

const PLACEMENTS = [
  'top-start',
  'top',
  'top-end',
  'right-start',
  'right',
  'right-end',
  'bottom-start',
  'bottom',
  'bottom-end',
  'left-start',
  'left',
  'left-end',
] as const

export const Placement: StoryFn<typeof PopupV2> = () => (
  <>
    {PLACEMENTS.map(placement => (
      <PopupV2.Root key={placement}>
        <PopupV2.Trigger>
          <Button sentiment="neutral" variant="outlined" size="small">
            {placement}
          </Button>
        </PopupV2.Trigger>
        <PopupV2.Panel placement={placement}>
          <Stack gap={1}>
            <Text as="p" variant="bodySmall">
              Placement demo, automatically flipped when out of viewport.
            </Text>
          </Stack>
        </PopupV2.Panel>
      </PopupV2.Root>
    ))}
  </>
)

Placement.decorators = [
  StoryComponent => (
    <Stack alignItems="center" gap={2} justifyContent="center" style={{ margin: '2rem 1rem 1rem' }}>
      <StoryComponent />
    </Stack>
  ),
]
