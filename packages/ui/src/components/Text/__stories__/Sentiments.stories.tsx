import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import { SENTIMENTS } from '../../../theme'
import { Text } from '../index'

export const Sentiments: StoryFn<ComponentProps<typeof Text>> = args => (
  <div>
    {SENTIMENTS.map(sentiment => (
      <Text
        {...args}
        key={sentiment}
        as="div"
        variant="body"
        sentiment={sentiment}
      >
        This text uses {sentiment} sentiment.
      </Text>
    ))}

    <div style={{ background: 'white' }}>
      <Text {...args} as="div" variant="body" sentiment="black">
        Use black sentiment to make text black no matter the theme.
      </Text>
    </div>
    <div style={{ background: 'black' }}>
      <Text {...args} as="div" variant="body" sentiment="white">
        Use white sentiment to make text white no matter the theme.
      </Text>
    </div>
  </div>
)
Sentiments.parameters = {
  docs: {
    description: {
      story: 'Set a sentiment using `sentiment` property.',
    },
  },
}
