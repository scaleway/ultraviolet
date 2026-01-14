import type { StoryFn } from '@storybook/react-vite'
import { Stack } from '../../Stack'
import { Menu } from '..'
import { DefaultDisclosure } from './Template.stories'

export const Overflowing: StoryFn<typeof Menu> = () => (
  <Stack gap={9}>
    <div style={{ alignItems: 'start', display: 'flex', flex: 1 }}>
      <Menu disclosure={DefaultDisclosure} placement="right">
        <Menu.Item>Default</Menu.Item>
        <Menu.Item>Default</Menu.Item>
        <Menu.Item>Default</Menu.Item>
        <Menu.Item>Default</Menu.Item>
        <Menu.Item>Default</Menu.Item>
        <Menu.Item>Default</Menu.Item>
        <Menu.Item>Default</Menu.Item>
      </Menu>
    </div>
    <div style={{ display: 'flex', flex: 1, justifyContent: 'start' }}>
      <Menu disclosure={DefaultDisclosure} placement="bottom">
        <Menu.Item>Default</Menu.Item>
        <Menu.Item>Default</Menu.Item>
        <Menu.Item>Default</Menu.Item>
        <Menu.Item>Default</Menu.Item>
        <Menu.Item>Default</Menu.Item>
        <Menu.Item>Default</Menu.Item>
        <Menu.Item>Default</Menu.Item>
        <Menu.Item>Default</Menu.Item>
      </Menu>
    </div>
    <div style={{ display: 'flex', flex: 1, justifyContent: 'end' }}>
      <Menu disclosure={DefaultDisclosure} placement="top">
        <Menu.Item>Default</Menu.Item>
        <Menu.Item>Default</Menu.Item>
        <Menu.Item>Default</Menu.Item>
        <Menu.Item>Default</Menu.Item>
      </Menu>
    </div>
    <div style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
      <Menu disclosure={DefaultDisclosure} placement="left">
        <Menu.Item>Default</Menu.Item>
        <Menu.Item>Default</Menu.Item>
        <Menu.Item>Default</Menu.Item>
        <Menu.Item>Default</Menu.Item>
        <Menu.Item>Default</Menu.Item>
        <Menu.Item>Default</Menu.Item>
        <Menu.Item>Default</Menu.Item>
        <Menu.Item>Default</Menu.Item>
        <Menu.Item>Default</Menu.Item>
        <Menu.Item>Default</Menu.Item>
      </Menu>
    </div>
  </Stack>
)

Overflowing.parameters = {
  docs: {
    description: {
      story:
        'This story is only to check the behavior of the menu when it overflows the parent container.',
    },
  },
}

Overflowing.decorators = [
  StoryComponent => (
    <div
      style={{
        height: '100%',
        marginLeft: '-60px',
        marginTop: '-40px',
        width: '990px',
      }}
    >
      <StoryComponent />
    </div>
  ),
]
