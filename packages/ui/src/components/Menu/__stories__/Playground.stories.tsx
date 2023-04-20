import { Menu } from '..'
import { Template } from './Template.stories'

export const Playground = Template.bind({})

Playground.args = {
  children: [
    <Menu.Item>Menu Item 1</Menu.Item>,
    <Menu.Item>Menu Item 2</Menu.Item>,
  ],
}

Playground.decorators = [
  StoryComponent => (
    <div style={{ height: '80px' }}>
      <StoryComponent />
    </div>
  ),
]
