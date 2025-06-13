import type { StoryFn } from '@storybook/react'
import { MenuV2 } from '..'
import { DefaultDisclosure } from './Template.stories'

export const Nested: StoryFn<typeof MenuV2> = ({ ...props }) => (
  <MenuV2 {...props} disclosure={DefaultDisclosure} searchable>
    <MenuV2.Item borderless>Power on</MenuV2.Item>
    <MenuV2
      disclosure={<MenuV2.Item>SubMenu click</MenuV2.Item>}
      triggerMethod="click"
    >
      <MenuV2.Item>hi!</MenuV2.Item>
    </MenuV2>
    <MenuV2
      disclosure={<MenuV2.Item>SubMenu hover</MenuV2.Item>}
      triggerMethod="hover"
    >
      <MenuV2.Item>hello</MenuV2.Item>
    </MenuV2>
    {/**
     * VERY NESTED MENUS
     */}
    <MenuV2
      disclosure={<MenuV2.Item>click for a very nested menu</MenuV2.Item>}
    >
      <MenuV2 disclosure={<MenuV2.Item>nested 1</MenuV2.Item>}>
        <MenuV2.Item borderless>Item</MenuV2.Item>
        <MenuV2.Item borderless>Item</MenuV2.Item>
        <MenuV2 disclosure={<MenuV2.Item>nested 2</MenuV2.Item>}>
          <MenuV2.Item borderless>Item</MenuV2.Item>
          <MenuV2 disclosure={<MenuV2.Item>nested 3</MenuV2.Item>}>
            <MenuV2.Item>very nested</MenuV2.Item>
          </MenuV2>
          <MenuV2.Item borderless>Item</MenuV2.Item>
          <MenuV2.Item borderless>Item</MenuV2.Item>
          <MenuV2.Item borderless>Item</MenuV2.Item>
        </MenuV2>
      </MenuV2>
      <MenuV2.Item>Item</MenuV2.Item>
    </MenuV2>
  </MenuV2>
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
