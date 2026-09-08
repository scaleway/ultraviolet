import { Template } from './Template.stories'

export const Square = Template.bind({})

Square.decorators = [
  StoryComponent => (
    <div style={{ height: '100px', width: '100px' }}>
      <StoryComponent />
    </div>
  ),
]

Square.args = {
  variant: 'square',
}
