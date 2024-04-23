import { Template } from './Template.stories'
import { dataUnGrouped } from './resources'

export const Playground = Template.bind({})

Playground.args = { ...Template.args, options: dataUnGrouped, helper: 'helper' }
Playground.decorators = [
  StoryComponent => (
    <div style={{ height: '80px' }}>
      <StoryComponent />
    </div>
  ),
]
