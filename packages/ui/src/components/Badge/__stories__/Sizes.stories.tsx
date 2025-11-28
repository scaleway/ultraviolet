import type { StoryFn } from '@storybook/react-vite'
import { Badge } from '..'

export const Sizes: StoryFn = props => (
  <>
    {(['xsmall', 'small', 'medium', 'large'] as const).map(size => (
      <Badge key={size} {...props} sentiment="primary" size={size}>
        {size}
      </Badge>
    ))}
  </>
)

Sizes.parameters = {
  docs: {
    description: {
      story: 'You can define size of a badge using `size` property.',
    },
  },
}

Sizes.args = {
  children: [],
}

Sizes.decorators = [
  StoryComponent => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      <StoryComponent />
    </div>
  ),
]
