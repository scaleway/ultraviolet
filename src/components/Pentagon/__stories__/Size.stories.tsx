import { Story } from '@storybook/react'
import Pentagon from '..'

export const Size: Story = props => (
  <>
    <Pentagon size="50px" {...props} />
    <Pentagon size="100px" {...props} />
    <Pentagon size="150px" {...props} />
    <Pentagon size="200px" {...props} />
  </>
)

Size.decorators = [
  StoryComponent => (
    <div style={{ display: 'inline-flex' }}>
      <StoryComponent />
    </div>
  ),
]
