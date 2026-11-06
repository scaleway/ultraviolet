import type { StoryFn } from '@storybook/react-vite'
import { theme } from '@ultraviolet/themes'
import { useState } from 'react'
import { Menu } from '..'
import { Button } from '../../../Action/Button'
import { Stack } from '../../../Layout/Stack'
import { DefaultDisclosure } from './Template.stories'

export const Controlled: StoryFn<typeof Menu> = () => {
  const [visible, setVisible] = useState(true)

  return (
    <Stack direction="row" gap="1" width="100%" alignItems="center">
      <Stack
        style={{
          backgroundColor: theme.colors.neutral.backgroundStrong,
          padding: theme.space[1],
          borderRadius: theme.radii.default,
        }}
        direction="row"
        gap={1}
        alignItems="center"
      >
        <Button size="small" onClick={() => setVisible(!visible)}>
          {visible ? 'Close' : 'Open'} menu
        </Button>{' '}
        (this is outside of the Menu)
      </Stack>

      <Menu disclosure={DefaultDisclosure} visible={visible}>
        <Menu.Item>Menu 1</Menu.Item>
      </Menu>
    </Stack>
  )
}

Controlled.parameters = {
  docs: {
    description: {
      story: 'You can use the prop `visible` to manually control the component visibility',
    },
  },
}

Controlled.decorators = [StoryComponent => <StoryComponent />]
