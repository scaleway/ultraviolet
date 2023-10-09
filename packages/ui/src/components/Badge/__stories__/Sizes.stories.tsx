import type { StoryFn } from '@storybook/react'
import { Badge, SIZES } from '..'

export const Sizes: StoryFn = props => (
  <>
    {Object.keys(SIZES).map(size => (
      <Badge
        {...props}
        key={size}
        sentiment="primary"
        size={size as keyof typeof SIZES}
      >
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
