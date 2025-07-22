import type { StoryFn } from '@storybook/react-vite'
import { Menu } from '..'
import { Stack } from '../../Stack'
import { DefaultDisclosure } from './Template.stories'

export const Overflowing: StoryFn<typeof Menu> = () => (
  <Stack gap={9}>
    <div style={{ display: 'flex', alignItems: 'start', flex: 1 }}>
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
    <div style={{ display: 'flex', justifyContent: 'start', flex: 1 }}>
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
    <div style={{ display: 'flex', justifyContent: 'end', flex: 1 }}>
      <Menu disclosure={DefaultDisclosure} placement="top">
        <Menu.Item>Default</Menu.Item>
        <Menu.Item>Default</Menu.Item>
        <Menu.Item>Default</Menu.Item>
        <Menu.Item>Default</Menu.Item>
      </Menu>
    </div>
    <div style={{ display: 'flex', justifyContent: 'center', flex: 1 }}>
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
      story: `This story is only to check the behavior of the menu when it overflows the parent container.`,
    },
  },
}

Overflowing.decorators = [
  StoryComponent => (
    <div
      style={{
        height: '100%',
        width: '990px',
        marginTop: '-40px',
        marginLeft: '-60px',
      }}
    >
      <StoryComponent />
    </div>
  ),
]
