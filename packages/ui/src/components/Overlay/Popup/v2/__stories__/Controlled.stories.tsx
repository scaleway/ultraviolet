import type { StoryFn } from '@storybook/react-vite'
import { useState } from 'react'
import { TextInput } from '../../../../Data Entry/TextInput'
import { Toggle } from '../../../../Data Entry/Toggle'
import { Stack } from '../../../../Layout/Stack'
import { Text } from '../../../../Typography/Text'
import { PopupV2 } from '../index'

const Content = () => (
  <Stack gap={1}>
    <Text as="p" variant="bodySmall">
      Controlled popup: opening/closing is driven entirely by the{' '}
      <Text as="span" variant="bodySmallStrong">
        visible
      </Text>{' '}
      property.
    </Text>
  </Stack>
)

export const Controlled: StoryFn<typeof PopupV2> = () => {
  const [visible, setVisible] = useState(false)

  return (
    <Stack gap={3} alignItems="flex-start">
      <Toggle checked={visible} label="Toggle from outside" onChange={event => setVisible(event.target.checked)} />
      <PopupV2.Root visible={visible}>
        <PopupV2.Trigger>
          <TextInput label="Passive Input" />
        </PopupV2.Trigger>
        <PopupV2.Panel initialFocus={-1}>
          <Content />
        </PopupV2.Panel>
      </PopupV2.Root>
    </Stack>
  )
}
