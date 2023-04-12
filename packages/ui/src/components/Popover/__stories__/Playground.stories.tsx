import { Template } from './Template.stories'

export const Playground = Template.bind({})

Playground.decorators = [
  StoryComponent => (
    <div
      style={{ display: 'flex', justifyContent: 'center', marginTop: '84px' }}
    >
      <StoryComponent />
    </div>
  ),
]
