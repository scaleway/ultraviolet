import type { Decorator } from '@storybook/react'
import { Stack } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { Icon } from '..'

const COLORS = ['primary', 'success', 'warning'] as const

export const Sentiment = (args: ComponentProps<typeof Icon>) =>
  COLORS.map(sentiment => (
    <Icon key={sentiment} name="eye" sentiment={sentiment} {...args} />
  ))

Sentiment.parameters = {
  docs: {
    description: { story: 'Set sentiment using `sentiment` property.' },
  },
}

Sentiment.decorators = [
  Story => (
    <Stack gap={2} alignItems="center" direction="row">
      <Story />
    </Stack>
  ),
] as Decorator[]
