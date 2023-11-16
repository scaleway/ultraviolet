import { Template } from './Template.stories'

export const Playground = Template.bind({})

Playground.decorators = [
  StoryComponent => (
    <div style={{ height: '200px' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <StoryComponent />
      </div>
    </div>
  ),
]
