import { MenuV2 } from '..'
import { Template } from './Template.stories'

export const Playground = Template.bind({})

Playground.args = {
  children: [
    <MenuV2.Item borderless>Information with a long name</MenuV2.Item>,
    <MenuV2.Item borderless>Power on</MenuV2.Item>,
  ],
}

Playground.decorators = [
  StoryComponent => (
    <div style={{ height: '80px', width: 'min-content' }}>
      <StoryComponent />
    </div>
  ),
]
