import type { StoryFn } from '@storybook/react'
import { MenuV2 } from '..'
import { DefaultDisclosure } from './Template.stories'

export const Nested: StoryFn<typeof MenuV2> = ({ ...props }) => (
  <MenuV2 {...props} disclosure={DefaultDisclosure} searchable>
    <MenuV2.Item borderless>Power on</MenuV2.Item>
    <MenuV2
      disclosure={<MenuV2.Item>SubMenu click</MenuV2.Item>}
      placement="right"
      triggerMethod="click"
    >
      <MenuV2.Item>hi!</MenuV2.Item>
    </MenuV2>
    <MenuV2
      disclosure={<MenuV2.Item>SubMenu hover</MenuV2.Item>}
      placement="right"
      triggerMethod="hover"
    >
      <MenuV2.Item>hello</MenuV2.Item>
    </MenuV2>
  </MenuV2>
)

Nested.parameters = {
  docs: {
    description: {
      story: 'It is possible to have nested menus.',
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
