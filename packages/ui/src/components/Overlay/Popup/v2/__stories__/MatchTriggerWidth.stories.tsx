import type { StoryFn } from '@storybook/react-vite'
import { theme } from '@ultraviolet/themes'
import { Button } from '../../../../Action/Button'
import { Stack } from '../../../../Layout/Stack'
import { Text } from '../../../../Typography/Text'
import { usePopupContext } from '../context'
import { Popup } from '../index'

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
      <Popup.Trigger>
        <Button fullWidth sentiment="neutral" variant="outlined">
          Actions
        </Button>
      </Popup.Trigger>
      <Popup.Panel matchTriggerWidth role="menu" accessibleLabel="Actions" placement="bottom-start">
        <Stack gap={0} style={{ padding: theme.space['0.5'] }}>
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
      </Popup.Panel>
    </>
  )
}

export const MatchTriggerWidth: StoryFn<typeof Popup> = () => (
  <Popup.Root visible>
    <MenuList />
  </Popup.Root>
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
