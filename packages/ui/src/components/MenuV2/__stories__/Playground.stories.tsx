import { MenuV2 } from '..'
import { Template } from './Template.stories'

export const Playground = Template.bind({})

Playground.args = {
  children: [
    <MenuV2.Item>MenuV2 Item 1</MenuV2.Item>,
    <MenuV2.Item>MenuV2 Item 2</MenuV2.Item>,
  ],
}

Playground.decorators = [
  StoryComponent => (
    <div style={{ height: '80px', width: 'min-content' }}>
      <StoryComponent />
    </div>
  ),
]
