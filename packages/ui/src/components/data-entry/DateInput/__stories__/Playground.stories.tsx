import { Template } from './Template'

export const Playground = Template.bind({})

Playground.args = {
  placeholder: 'DD-MM-YYYY',
}

Playground.decorators = [
  StoryComponent => (
    <div style={{ height: '350px' }}>
      <StoryComponent />
    </div>
  ),
]
