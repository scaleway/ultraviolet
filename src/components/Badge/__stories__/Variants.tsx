import { Story } from '@storybook/react'
import Badge from '..'
import { SENTIMENTS } from '../../../theme'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Variants: Story = _props => (
  <>
    {SENTIMENTS.map(sentiment => (
      <Badge key={sentiment} variant={sentiment}>
        {sentiment}
      </Badge>
    ))}
  </>
)

Variants.parameters = {
  docs: {
    storyDescription:
      'Variant defines different colors of your component. You can define it using `variant` property.',
  },
}

Variants.args = {
  children: [],
}

Variants.decorators = [
  StoryComponent => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      <StoryComponent />
    </div>
  ),
]
