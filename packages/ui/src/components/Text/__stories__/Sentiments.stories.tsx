import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import { SENTIMENTS } from '../../../theme'
import { Text } from '../index'

export const Sentiments: StoryFn<ComponentProps<typeof Text>> = args => (
  <div>
    {SENTIMENTS.map(sentiment => (
      <Text
        {...args}
        as="div"
        key={sentiment}
        sentiment={sentiment}
        variant="body"
      >
        This text uses {sentiment} sentiment.
      </Text>
    ))}

    <div style={{ background: 'white' }}>
      <Text {...args} as="div" sentiment="black" variant="body">
        Use black sentiment to make text black no matter the theme.
      </Text>
    </div>
    <div style={{ background: 'black' }}>
      <Text {...args} as="div" sentiment="white" variant="body">
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
