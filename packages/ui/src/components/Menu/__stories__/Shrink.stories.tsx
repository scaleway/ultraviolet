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

    <Menu
      disclosure={<Button>default with placement bottom</Button>}
      placement="bottom"
    >
      <Menu.Item>item</Menu.Item>
      <Menu.Item>item</Menu.Item>
      <Menu.Item>item</Menu.Item>
      <Menu.Item>item</Menu.Item>
      <Menu.Item>item</Menu.Item>

      <Menu.Item>item</Menu.Item>
    </Menu>

    <Menu
      disclosure={<Button>shrink=true and placement bottom</Button>}
      placement="bottom"
      shrink
    >
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
        'When the menu is at the bottom of a page (not possible to scroll down further), with `placement = "bottom"`, it can shrink so that it does not cause overflow. Activate this feature using prop `shrink`',
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
