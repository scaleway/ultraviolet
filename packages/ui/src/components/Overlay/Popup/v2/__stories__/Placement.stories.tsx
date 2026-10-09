import type { StoryFn } from '@storybook/react-vite'
import { Button } from '../../../../Action/Button'
import { Stack } from '../../../../Layout/Stack'
import { Text } from '../../../../Typography/Text'
import { Popup } from '../index'

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

export const Placement: StoryFn<typeof Popup> = () => (
  <>
    {PLACEMENTS.map(placement => (
      <Popup.Root key={placement}>
        <Popup.Trigger>
          <Button sentiment="neutral" variant="outlined" size="small">
            {placement}
          </Button>
        </Popup.Trigger>
        <Popup.Panel placement={placement}>
          <Stack gap={1}>
            <Text as="p" variant="bodySmall">
              Placement demo, automatically flipped when out of viewport.
            </Text>
          </Stack>
        </Popup.Panel>
      </Popup.Root>
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
