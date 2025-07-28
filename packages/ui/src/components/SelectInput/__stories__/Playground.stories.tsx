import { dataUnGrouped } from './resources'
import { Template } from './Template.stories'

export const Playground = Template.bind({})

Playground.args = { ...Template.args, helper: 'helper', options: dataUnGrouped }
Playground.decorators = [
  StoryComponent => (
    <div style={{ height: '80px' }}>
      <StoryComponent />
    </div>
  ),
]
