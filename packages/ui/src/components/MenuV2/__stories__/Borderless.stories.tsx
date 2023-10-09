import type { StoryFn } from '@storybook/react'
import { MenuV2 } from '..'
import { DefaultDisclosure } from './Template.stories'

export const Borderless: StoryFn<typeof MenuV2> = () => (
  <MenuV2 disclosure={DefaultDisclosure}>
    <MenuV2.Item borderless>default (neutral)</MenuV2.Item>
    <MenuV2.Item sentiment="danger" borderless>
      Danger
    </MenuV2.Item>
    <MenuV2.Item
      href="/?path=/docs/components-navigation-menu--borderless"
      borderless
    >
      Link Neutral
    </MenuV2.Item>
    <MenuV2.Item
      sentiment="danger"
      href="/?path=/docs/components-navigation-menu--borderless"
      borderless
    >
      Link Danger
    </MenuV2.Item>
  </MenuV2>
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
