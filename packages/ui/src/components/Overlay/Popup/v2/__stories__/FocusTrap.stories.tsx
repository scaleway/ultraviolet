import type { StoryFn } from '@storybook/react-vite'
import { CloseIcon } from '@ultraviolet/icons/CloseIcon'
import { useRef, useState } from 'react'
import { Button } from '../../../../Action/Button'
import { Stack } from '../../../../Layout/Stack'
import { Text } from '../../../../Typography/Text'
import { PopupV2 } from '../index'

export const FocusTrap: StoryFn<typeof PopupV2> = () => {
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const [visible, setVisible] = useState(false)

  return (
    <PopupV2.Root visible={visible} onOpenChange={setVisible}>
      <PopupV2.Trigger>
        <Button sentiment="neutral" variant="outlined">
          Open the Popup
        </Button>
      </PopupV2.Trigger>
      <PopupV2.Panel focusTrap initialFocus={closeButtonRef} accessibleLabel="Popup with focus trap" maxWidth={400}>
        <Stack gap={2} width="100%">
          <Stack alignItems="center" direction="row" gap={2} justifyContent="space-between">
            <Text as="h3" sentiment="neutral" variant="bodyStrong">
              Popup with focus trap
            </Text>
            <Button
              ref={closeButtonRef}
              accessibleLabel="Close"
              onClick={() => setVisible(false)}
              sentiment="neutral"
              size="xsmall"
              variant="ghost"
            >
              <CloseIcon size="small" />
            </Button>
          </Stack>
          <Text as="p" sentiment="neutral" variant="bodySmall">
            This popup traps the keyboard focus: pressing Tab cycles through the interactive elements and stays inside,
            never reaching the page behind. Press Escape or click the close button to dismiss it and restore focus to
            the trigger.
          </Text>
          <Stack direction="row" gap={1} justifyContent="flex-end">
            <Button variant="outlined" sentiment="neutral" size="small" onClick={() => setVisible(false)}>
              Previous
            </Button>
            <Button variant="filled" size="small" onClick={() => setVisible(false)}>
              Next
            </Button>
          </Stack>
        </Stack>
      </PopupV2.Panel>
    </PopupV2.Root>
  )
}
