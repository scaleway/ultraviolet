import type { StoryFn } from '@storybook/react-vite'
import { Menu } from '..'
import { DefaultDisclosure } from './Template.stories'

export const Borderless: StoryFn<typeof Menu> = () => (
  <Menu disclosure={DefaultDisclosure}>
    <Menu.Item borderless>default (neutral)</Menu.Item>
    <Menu.Item borderless sentiment="danger">
      Danger
    </Menu.Item>
    <Menu.Item
      borderless
      href="/?path=/docs/components-navigation-menu--borderless"
    >
      Link Neutral
    </Menu.Item>
    <Menu.Item
      borderless
      href="/?path=/docs/components-navigation-menu--borderless"
      sentiment="danger"
    >
      Link Danger
    </Menu.Item>
  </Menu>
)

Borderless.parameters = {
  docs: {
    description: {
      story: 'Property `borderless` removes border of the menu item.',
    },
  },
}

Borderless.decorators = [
  StoryComponent => (
    <div style={{ height: '250px', width: 'min-content' }}>
      <StoryComponent />
    </div>
  ),
]
