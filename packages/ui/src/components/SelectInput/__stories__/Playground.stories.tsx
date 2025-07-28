import { dataUnGrouped } from './resources'
import { Template } from './Template.stories'

export const Playground = Template.bind({})

Playground.args = { ...Template.args, options: dataUnGrouped, helper: 'helper' }
Playground.decorators = [
  StoryComponent => (
    <div style={{ height: '80px' }}>
      <StoryComponent />
    </div>
  ),
]
