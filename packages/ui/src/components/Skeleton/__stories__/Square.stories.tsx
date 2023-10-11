import { Template } from './Template.stories'

export const Square = Template.bind({})

Square.decorators = [
  StoryComponent => (
    <div style={{ width: '100px', height: '100px' }}>
      <StoryComponent />
    </div>
  ),
]

Square.args = {
  variant: 'square',
}
