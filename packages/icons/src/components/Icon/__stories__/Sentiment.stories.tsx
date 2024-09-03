import type { Decorator } from '@storybook/react'
import { Stack } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { Eye } from '..'

const COLORS = ['primary', 'success', 'warning'] as const

export const Sentiment = (args: ComponentProps<typeof Eye>) =>
  COLORS.map(sentiment => (
    <Eye key={sentiment} sentiment={sentiment} {...args} />
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
