import { Template } from './Template'

export const Playground = Template.bind({})

Playground.decorators = [
  StoryComponent => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <StoryComponent />
    </div>
  ),
]
