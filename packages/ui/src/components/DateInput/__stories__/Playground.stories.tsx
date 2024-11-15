import { Template } from './Template'

export const Playground = Template.bind({})

Playground.args = {
  placeholder: 'MM-DD-YYYY',
}

Playground.decorators = [
  StoryComponent => (
    <div style={{ height: '350px' }}>
      <StoryComponent />
    </div>
  ),
]
