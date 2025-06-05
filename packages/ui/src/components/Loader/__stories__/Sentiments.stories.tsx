import type { StoryFn } from '@storybook/react'
import { SENTIMENTS } from '../../../theme'
import type { ExtendedColor } from '../../../theme'
import { Stack } from '../../Stack'
import { Loader } from '../index'

export const Sentiments: StoryFn = props => (
  <Stack gap={4}>
    {[...SENTIMENTS, 'white', 'black'].map(sentiment => (
      <Stack alignItems="center">
        <Loader
          {...props}
          sentiment={sentiment as ExtendedColor}
          key={sentiment}
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
