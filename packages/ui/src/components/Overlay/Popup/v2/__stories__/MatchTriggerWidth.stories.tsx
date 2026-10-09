import type { StoryFn } from '@storybook/react-vite'
import { Button } from '../../../../Action/Button'
import { Stack } from '../../../../Layout/Stack'
import { Text } from '../../../../Typography/Text'
import { usePopupContext } from '../context'
import { PopupV2 } from '../index'

const ACTIONS = [
  'Create a new compute instance in the selected region',
  'Migrate the current workload to a dedicated environment',
  'Archive unused storage volumes to cold storage',
  'Restart all containers of the deployment',
]

const MenuList = () => {
  const { context } = usePopupContext()
  const close = () => context.onOpenChange(false)

  return (
    <>
      <PopupV2.Trigger>
        <Button fullWidth sentiment="neutral" variant="outlined">
          Actions
        </Button>
      </PopupV2.Trigger>
      <PopupV2.Panel matchTriggerWidth role="menu" accessibleLabel="Actions" placement="bottom-start">
        <Stack gap={0}>
          {ACTIONS.map(action => (
            <Button
              key={action}
              fullWidth
              size="small"
              variant="ghost"
              sentiment="neutral"
              role="menuitem"
              onClick={close}
              style={{ justifyContent: 'flex-start' }}
            >
              {action}
            </Button>
          ))}
        </Stack>
      </PopupV2.Panel>
    </>
  )
}

export const MatchTriggerWidth: StoryFn<typeof PopupV2> = () => (
  <PopupV2.Root visible>
    <MenuList />
  </PopupV2.Root>
)

MatchTriggerWidth.decorators = [
  StoryComponent => (
    <Stack gap={2}>
      <Text as="p" variant="body">
        Resize the Trigger to notice how the Popup follows its width.
      </Text>
      <div
        style={{
          border: '1px solid black',
          width: '100%',
          maxWidth: '40rem',
          overflow: 'auto',
          padding: '1rem 2rem',
          resize: 'horizontal',
        }}
      >
        <StoryComponent />
      </div>
    </Stack>
  ),
]
