import type { StoryFn } from '@storybook/react'
import { Menu } from '..'
import { DefaultDisclosure } from './Template.stories'

export const Nested: StoryFn<typeof Menu> = ({ ...props }) => (
  <Menu {...props} disclosure={DefaultDisclosure} searchable>
    <Menu.Item borderless>Power on</Menu.Item>
    <Menu
      disclosure={<Menu.Item>SubMenu click</Menu.Item>}
      triggerMethod="click"
    >
      <Menu.Item>hi!</Menu.Item>
    </Menu>
    <Menu
      disclosure={<Menu.Item>SubMenu hover</Menu.Item>}
      triggerMethod="hover"
    >
      <Menu.Item>hello</Menu.Item>
    </Menu>
    {/**
     * VERY NESTED MENUS
     */}
    <Menu disclosure={<Menu.Item>click for a very nested menu</Menu.Item>}>
      <Menu disclosure={<Menu.Item>nested 1</Menu.Item>}>
        <Menu.Item borderless>Item</Menu.Item>
        <Menu.Item borderless>Item</Menu.Item>
        <Menu disclosure={<Menu.Item>nested 2</Menu.Item>}>
          <Menu.Item borderless>Item</Menu.Item>
          <Menu disclosure={<Menu.Item>nested 3</Menu.Item>}>
            <Menu.Item>very nested</Menu.Item>
          </Menu>
          <Menu.Item borderless>Item</Menu.Item>
          <Menu.Item borderless>Item</Menu.Item>
          <Menu.Item borderless>Item</Menu.Item>
        </Menu>
      </Menu>
      <Menu.Item>Item</Menu.Item>
    </Menu>
  </Menu>
)

Nested.parameters = {
  docs: {
    description: {
      story:
        'It is possible to have nested menus. Their positionning is automatic (right, or left if there is not enough available space on the rightt).',
    },
  },
}

Nested.decorators = [
  StoryComponent => (
    <div style={{ height: '500px', width: 'min-content' }}>
      <StoryComponent />
    </div>
  ),
]
