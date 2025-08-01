import type { StoryFn } from '@storybook/react-vite'
import { Button } from '../../Button'
import { Menu } from '..'

export const Shrink: StoryFn<typeof Menu> = () => (
  <>
    <Menu disclosure={<Button>default</Button>}>
      <Menu.Item>item</Menu.Item>
      <Menu.Item>item</Menu.Item>
      <Menu.Item>item</Menu.Item>
      <Menu.Item>item</Menu.Item>
      <Menu.Item>item</Menu.Item>

      <Menu.Item>item</Menu.Item>
    </Menu>

    <Menu disclosure={<Button>noShrink=true</Button>} noShrink>
      <Menu.Item>item</Menu.Item>
      <Menu.Item>item</Menu.Item>
      <Menu.Item>item</Menu.Item>
      <Menu.Item>item</Menu.Item>
      <Menu.Item>item</Menu.Item>

      <Menu.Item>item</Menu.Item>
    </Menu>
  </>
)

Shrink.parameters = {
  docs: {
    description: {
      story:
        'When the menu is at the bottom of a page (not possible to scroll down further), with `placement = "bottom"`, it will shrink so that it does not cause overflow. It is possible to remove this feature using prop `noShrink`',
    },
  },
}

Shrink.decorators = [
  StoryComponent => (
    <div
      style={{
        alignItems: 'flex-end',
        display: 'flex',
        gap: '16px',
        justifyContent: 'center',
        position: 'absolute',
        width: '100%',
      }}
    >
      <StoryComponent />
    </div>
  ),
]
