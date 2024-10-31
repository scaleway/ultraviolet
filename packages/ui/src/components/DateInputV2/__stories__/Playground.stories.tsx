import { Template } from './Template'

export const Playground = Template.bind({})

Playground.args = {
  placeholder: 'YYYY-MM-DD',
}

Playground.decorators = [
  StoryComponent => (
    <div style={{ height: '350px' }}>
      <StoryComponent />
    </div>
  ),
]
