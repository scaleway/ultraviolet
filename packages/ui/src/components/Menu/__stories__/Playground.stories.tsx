import { Menu } from '..'
import { Template } from './Template.stories'

export const Playground = Template.bind({})

Playground.args = {
  children: [
    <Menu.Item borderless key="borderless">
      Information with a very long name. Lorem ipsum dolor sit amet, consectetur
      adipiscing elit.
    </Menu.Item>,
    <Menu.Item borderless key="power on">
      Power on
    </Menu.Item>,
  ],
}

Playground.decorators = [
  StoryComponent => (
    <div style={{ height: '80px', width: 'min-content' }}>
      <StoryComponent />
    </div>
  ),
]
