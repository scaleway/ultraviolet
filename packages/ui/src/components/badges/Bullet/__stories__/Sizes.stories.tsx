import type { StoryFn } from '@storybook/react-vite'
import { Bullet } from '..'

export const Sizes: StoryFn = props => (
  <>
    {(['medium', 'small', 'xsmall', 'xxsmall'] as const).map(size => (
      <div key={size}>
        <Bullet {...props} size={size}>
          1
        </Bullet>
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
      style={{
        alignItems: 'flex-start',
        display: 'flex',
        flexWrap: 'wrap',
        gap: 8,
      }}
    >
      <StoryComponent />
    </div>
  ),
]
