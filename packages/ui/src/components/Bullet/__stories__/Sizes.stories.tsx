import type { StoryFn } from '@storybook/react'
import { Bullet } from '..'

export const Sizes: StoryFn = props => (
  <>
    {(['medium', 'small', 'xsmall', 'xxsmall'] as const).map(size => (
      <div key={size}>
        <Bullet {...props} size={size} text="1" />
      </div>
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

Sizes.decorators = [
  StoryComponent => (
    <div
      style={{ display: 'flex', alignItems: 'start', flexWrap: 'wrap', gap: 8 }}
    >
      <StoryComponent />
    </div>
  ),
]
