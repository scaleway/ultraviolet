import type { StoryFn } from '@storybook/react-vite'
import type { ExtendedColor } from '../../../theme'
import { SENTIMENTS } from '../../../theme'
import { Stack } from '../../Stack'
import { Loader } from '../index'

export const Sentiments: StoryFn = props => (
  <Stack gap={4}>
    {[...SENTIMENTS, 'white', 'black'].map(sentiment => (
      <Stack alignItems="center">
        <Loader
          {...props}
          key={sentiment}
          sentiment={sentiment as ExtendedColor}
        />
        {sentiment}
      </Stack>
    ))}
  </Stack>
)

Sentiments.parameters = {
  docs: {
    description: {
      story:
        'You can set the color of the component with the `sentiment` prop.',
    },
  },
}
