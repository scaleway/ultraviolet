import type { StoryFn } from '@storybook/react-vite'
import { capitalize } from '@ultraviolet/utils'
import { ProgressBar } from '..'

const SIZES = ['small', 'medium', 'large'] as const
export const Size: StoryFn = props => (
  <>
    {SIZES.map(size => (
      <>
        {capitalize(size)}:
        <ProgressBar key={size} size={size} {...props} />
      </>
    ))}
  </>
)

Size.decorators = [
  StoryComponent => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <StoryComponent />
    </div>
  ),
]

Size.parameters = {
  docs: {
    description: { story: 'Set size using `size` prop.' },
  },
}

Size.args = {
  value: '30',
}
